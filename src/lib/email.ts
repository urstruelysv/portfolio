import nodemailer from "nodemailer";

type ContactEmailInput = {
  email: string;
  isUpdate: boolean;
};

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendContactEmail({ email, isUpdate }: ContactEmailInput) {
  const transport = getTransport();
  if (!transport) return false;

  const to = process.env.CONTACT_TO ?? "saivamshig404@gmail.com";
  const from = process.env.CONTACT_FROM ?? process.env.SMTP_USER ?? to;
  const subject = isUpdate ? "Contact re-submission" : "New contact submission";
  const text = [
    `Email: ${email}`,
    `Type: ${isUpdate ? "Updated submission" : "New submission"}`,
    `Time: ${new Date().toISOString()}`,
  ].join("\n");

  await transport.sendMail({ to, from, subject, text });
  return true;
}
