import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  // Works with Gmail (using an App Password) or any SMTP provider.
  // See server/.env.example for the variables this needs.
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

export async function sendWaitlistNotification(entry) {
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !ownerEmail) {
    console.log(
      "[email] SMTP_USER / SMTP_PASS / OWNER_EMAIL not set — skipping email notification. Signup was still saved to the database."
    );
    return;
  }

  const { email } = entry;

  try {
    await getTransporter().sendMail({
      from: `"Trackpay Waitlist" <${process.env.SMTP_USER}>`,
      to: ownerEmail,
      subject: `New waitlist signup: ${email}`,
      text: `${email} just joined the Trackpay waitlist.`,
      html: `<p><strong>${email}</strong> just joined the waitlist.</p>`,
    });
    console.log(`[email] Notification sent to ${ownerEmail} for ${email}`);
  } catch (err) {
    // Don't let a failed email break the signup itself —
    // it's already saved in MongoDB either way.
    console.error("[email] Failed to send notification:", err.message);
  }
}
