import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid data",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    const existingContact = await prisma.contact.findUnique({
      where: { email },
    });

    if (existingContact) {
      const updatedContact = await prisma.contact.update({
        where: { email },
        data: {
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        message: "Thank you! I will reach out to you soon.",
        contact: {
          id: updatedContact.id,
          email: updatedContact.email,
          submittedAt: updatedContact.submittedAt,
        },
      });
    }

    const newContact = await prisma.contact.create({
      data: {
        email,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your email has been saved successfully.",
      contact: {
        id: newContact.id,
        email: newContact.email,
        submittedAt: newContact.submittedAt,
      },
    });
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof Error) {
      if (error.message.includes("Prisma")) {
        return NextResponse.json(
          { error: "Database connection error. Please try again later." },
          { status: 500 }
        );
      }
    }

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