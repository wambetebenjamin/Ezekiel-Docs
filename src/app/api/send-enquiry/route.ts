import { NextRequest, NextResponse } from 'next/server';
import { createTransport } from 'nodemailer';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || '';
const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || '';

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number }> {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
      { method: 'POST' }
    );
    return await response.json();
  } catch {
    return { success: false };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, recaptchaToken } = body;

    if (!name || !email || !phone || !subject || !message || !recaptchaToken) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Verify reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success || (recaptchaResult.score && recaptchaResult.score < 0.5)) {
      return NextResponse.json({ requireV2: true }, { status: 400 });
    }

    // Send email to admin
    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const transporter = createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      await transporter.sendMail({
        from: SMTP_FROM,
        to: SMTP_FROM, // Admin email
        subject: `New Enquiry: ${subject}`,
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #ea580c;">New Contact Form Enquiry</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${name}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${phone}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Subject:</td><td style="padding: 8px;">${subject}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Message:</td><td style="padding: 8px;">${message.replace(/\n/g, '<br>')}</td></tr>
            </table>
          </div>
        `,
      });

      // Auto-reply to user
      await transporter.sendMail({
        from: SMTP_FROM,
        to: email,
        subject: 'We received your enquiry - Ezekiel Docs',
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #ea580c;">Thank you for contacting Ezekiel Docs</h2>
            <p>Hi ${name},</p>
            <p>We've received your enquiry about "<strong>${subject}</strong>" and will get back to you within 24 hours.</p>
            <p>If you need immediate assistance, you can also chat with us on <a href="https://wa.me/254112272061" style="color: #ea580c;">WhatsApp</a>.</p>
            <hr style="margin: 30px 0; border-color: #eee;">
            <p style="color: #999; font-size: 12px;">Ezekiel Docs - Your legal documents, done right.</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Send enquiry error:', error);
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 });
  }
}