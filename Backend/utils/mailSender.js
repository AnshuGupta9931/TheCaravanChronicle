import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // e.g. smtp.gmail.com
      port: process.env.MAIL_PORT, // 465 (SSL) or 587 (TLS)
      secure: process.env.MAIL_SECURE === "true", // true for SSL, false for TLS
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // disables certificate validation (use carefully)
      },
    });

    let info = await transporter.sendMail({
      from: `"GrievEase" <${process.env.MAIL_USER}>`, // sender name + email
      to: email,
      subject: title,
      text: "Your email client does not support HTML. Please enable HTML view.",
      html: body, // send HTML body
    });

    console.log("📧 Mail sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Mail sending failed:", error.message);
    throw error;
  }
};
