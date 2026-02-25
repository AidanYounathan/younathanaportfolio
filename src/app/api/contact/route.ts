import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL;
const RESEND_SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL;

if (!RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not set. Contact form will not send emails.');
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    if (!resend) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { senderEmail, subject, message } = body || {};

    if (!senderEmail || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!CONTACT_RECEIVER_EMAIL || !RESEND_SENDER_EMAIL) {
      return NextResponse.json({ error: 'Recipient or sender email not configured' }, { status: 500 });
    }

    const emailHtml = `
      <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #0f1724;">
        <h3>New contact form submission</h3>
        <p><strong>From:</strong> ${senderEmail}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="white-space: pre-wrap; margin-top: 8px;">${message}</div>
      </div>
    `;

    await resend.emails.send({
      from: RESEND_SENDER_EMAIL,
      to: CONTACT_RECEIVER_EMAIL,
      subject: `Portfolio contact — ${subject}`,
      html: emailHtml,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Error sending contact email:', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
