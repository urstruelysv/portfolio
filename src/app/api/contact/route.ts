import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendContactEmail } from "@/lib/email";

const contactSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type RateLimitState = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const rateLimitMap = new Map<string, RateLimitState>();

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.ip ?? "unknown";
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const existing = rateLimitMap.get(key);
  if (rateLimitMap.size > 1000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (now > v.resetAt) rateLimitMap.delete(k);
    }
  }
  if (!existing || now > existing.resetAt) {
    const next = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
    rateLimitMap.set(key, next);
    return { allowed: true, retryAfter: RATE_LIMIT_WINDOW_MS };
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.max(0, existing.resetAt - now) };
  }

  existing.count += 1;
  rateLimitMap.set(key, existing);
  return { allowed: true, retryAfter: Math.max(0, existing.resetAt - now) };
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();
  const logPrefix = `[contact:${requestId}]`;
  try {
    const body = await request.json();

    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      console.warn(logPrefix, "validation_failed", validationResult.error.issues);
      return NextResponse.json(
        {
          error: "Invalid data",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      console.warn(logPrefix, "missing_email");
      return NextResponse.json(
        { error: "Invalid data", details: ["Email is required."] },
        { status: 400 }
      );
    }
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`${clientIp}:${normalizedEmail}`);

    if (!rateLimit.allowed) {
      console.warn(logPrefix, "rate_limited", { clientIp, normalizedEmail });
      return NextResponse.json(
        { error: "Too many requests. Please try again soon." },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(rateLimit.retryAfter / 1000).toString(),
          },
        }
      );
    }

    let isUpdate = false;
    let contactPayload:
      | { id: string; email: string; submittedAt: Date }
      | null = null;

    try {
      console.info(logPrefix, "db_lookup", { normalizedEmail });
      const existingContact = await prisma.contact.findUnique({
        where: { email: normalizedEmail },
      });

      if (existingContact) {
        console.info(logPrefix, "db_update", { normalizedEmail });
        const updatedContact = await prisma.contact.update({
          where: { email: normalizedEmail },
          data: {
            updatedAt: new Date(),
          },
        });
        isUpdate = true;
        contactPayload = {
          id: updatedContact.id,
          email: updatedContact.email,
          submittedAt: updatedContact.submittedAt,
        };
      } else {
        console.info(logPrefix, "db_create", { normalizedEmail });
        const newContact = await prisma.contact.create({
          data: {
            email: normalizedEmail,
          },
        });
        contactPayload = {
          id: newContact.id,
          email: newContact.email,
          submittedAt: newContact.submittedAt,
        };
      }
    } catch (dbError) {
      console.error(logPrefix, "db_error", dbError);
    }

    try {
      const sent = await sendContactEmail({
        email: normalizedEmail,
        isUpdate,
      });
      if (!sent) {
        console.error(logPrefix, "email_not_configured");
      }
    } catch (mailError) {
      const errorMessage =
        mailError instanceof Error ? mailError.message : "Unknown error";
      console.error(logPrefix, "email_failed", errorMessage);
    }

    console.info(logPrefix, "success", {
      normalizedEmail,
      isUpdate,
      durationMs: Date.now() - startedAt,
    });
    return NextResponse.json({
      success: true,
      message: "Thank you! Your email has been saved successfully.",
      contact: contactPayload,
    });
  } catch (error) {
    console.error(logPrefix, "unexpected_error", error);

    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const offset = Number.parseInt(searchParams.get("offset") || "0");

    const contacts = await prisma.contact.findMany({
      orderBy: {
        submittedAt: "desc",
      },
      take: limit,
      skip: offset,
      select: {
        id: true,
        email: true,
        submittedAt: true,
      },
    });

    const totalContacts = await prisma.contact.count();

    return NextResponse.json({
      contacts,
      total: totalContacts,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
