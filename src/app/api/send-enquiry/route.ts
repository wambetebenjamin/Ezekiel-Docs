import { NextRequest, NextResponse } from 'next/server';
import { createTransport } from 'nodemailer';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || 'noreply@ezekieldocs.com';
const ENQUIRY_TO = process.env.ENQUIRY_TO || SMTP_USER;

interface EnquiryRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  recaptchaToken?: string;
}

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.warn('RECAPTCHA_SECRET_KEY not configured, skipping verification');
    return { success: true, score: 1 };
  }

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
      { method: 'POST' }
    );
    const data = await response.json();
    return { success: data.success, score: data.score || 0 };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, score: 0 };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: EnquiryRequest = await request.json();
    const { name, email, phone, subject, message, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, subject, message' },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken || '');
    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      return NextResponse.json(
        { requireV2: true, error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Send email if SMTP configured
    if (SMTP_HOST && SMTP_USER && SMTP_PASS && ENQUIRY_TO) {
      try {
        const transporter = createTransport({
          host: SMTP_HOST,
          port: Number(SMTP_PORT) || 587,
          secure: Number(SMTP_PORT) === 465,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        });

        await transporter.sendMail({
          from: SMTP_FROM,
          to: ENQUIRY_TO,
          replyTo: email,
          subject: `[Ezekiel Docs Enquiry] ${subject}`,
          html: `
            <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #ea580c; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; font-size: 24px;">Ezekiel Docs - New Enquiry</h1>
              </div>
              <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 0 0 8px 8px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #78350f; width: 120px;">Name:</td>
                    <td style="padding: 8px 0; color: #78350f;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #78350f;">Email:</td>
                    <td style="padding: 8px 0; color: #78350f;">${email}</td>
                  </tr>
                  ${phone ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #78350f;">Phone:</td>
                    <td style="padding: 8px 0; color: #78350f;">${phone}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #78350f;">Subject:</td>
                    <td style="padding: 8px 0; color: #78350f;">${subject}</td>
                  </tr>
                </table>
                <hr style="border-color: #f59e0b; margin: 20px 0;">
                <div style="background: white; padding: 15px; border-radius: 6px;">
                  <p style="margin: 0 0 10px; font-weight: 600; color: #78350f;">Message:</p>
                  <p style="margin: 0; color: #78350f; white-space: pre-wrap;">${message}</p>
                </div>
                <hr style="border-color: #f59e0b; margin: 20px 0;">
                <p style="margin: 0; font-size: 12px; color: #78350f;">Sent from Ezekiel Docs contact form on ${new Date().toLocaleString('en-KE')}</p>
              </div>
            </div>
          `,
        });

        // Send auto-reply to user
        await transporter.sendMail({
          from: SMTP_FROM,
          to: email,
          subject: 'We received your enquiry - Ezekiel Docs',
          html: `
            <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #ea580c; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; font-size: 24px;">Ezekiel Docs</h1>
                <p style="margin: 5px 0 0; opacity: 0.9;">Your legal documents, done right.</p>
              </div>
              <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 0 0 8px 8px;">
                <h2 style="margin: 0 0 15px; color: #92400e;">Thank you for contacting us!</h2>
                <p style="margin: 0 0 15px; color: #78350f;">Hi ${name},</p>
                <p style="margin: 0 0 15px; color: #78350f;">We've received your enquiry about "<strong>${subject}</strong>" and our team will get back to you within 24 hours.</p>
                <p style="margin: 0 0 15px; color: #78350f;">In the meantime, you can:</p>
                <ul style="margin: 0 0 15px; padding-left: 20px; color: #78350f;">
                  <li>Browse our <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://ezekieldocs.com'}/documents" style="color: #ea580c;">document library</a></li>
                  <li>Check our <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://ezekieldocs.com'}/pricing" style="color: #ea580c;">pricing plans</a></li>
                  <li>Chat with us on <a href="https://wa.me/254112272061" style="color: #ea580c;">WhatsApp</a></li>
                </ul>
                <hr style="border-color: #f59e0b; margin: 20px 0;">
                <p style="margin: 0; font-size: 12px; color: #78350f;">If you didn't send this enquiry, please ignore this email.</p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Don't fail the request if email fails - log and continue
      }
    } else {
      console.warn('SMTP not configured, enquiry logged but not emailed');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Send enquiry error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}