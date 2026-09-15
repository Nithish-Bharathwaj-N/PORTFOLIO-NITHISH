import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

function escapeHtml(str: string) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields (Name, Email, and Message are required)' }, { status: 400 });
        }

        const safeName = escapeHtml(name.trim());
        const safeEmail = escapeHtml(email.trim());
        const safeSubject = escapeHtml((subject || 'General Inquiry').trim());
        const rawMessage = message.trim();
        const safeMessageHtml = escapeHtml(rawMessage).replace(/\n/g, '<br />');

        const recipientEmail = process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER || 'nithishbharathwajn@gmail.com';
        const senderUser = process.env.EMAIL_USER || 'nithishbharathwajn@gmail.com';
        const gmailPass = process.env.EMAIL_APP_PASSWORD || process.env.SMTP_PASS || '';
        const resendApiKey = process.env.RESEND_API_KEY || '';

        // HTML Templates with Modern Executive UI Styling
        const ownerEmailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 24px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
                    
                    <!-- Header Banner -->
                    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 28px; color: #ffffff; text-align: left; border-bottom: 4px solid #0284c7;">
                        <div style="display: inline-block; background-color: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 6px 12px; border-radius: 20px; margin-bottom: 12px; border: 1px solid rgba(56, 189, 248, 0.3);">
                            📬 New Portfolio Message
                        </div>
                        <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; color: #ffffff;">Inquiry from ${safeName}</h1>
                        <p style="margin: 6px 0 0 0; font-size: 14px; color: #94a3b8;">Received via nithishbharathwajn.com contact form</p>
                    </div>
                    
                    <!-- Content Area -->
                    <div style="padding: 28px;">
                        
                        <!-- Sender Metadata Grid -->
                        <div style="background-color: #f8fafc; border-radius: 14px; padding: 20px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 110px;">Sender Name:</td>
                                    <td style="padding: 6px 0; font-size: 15px; color: #0f172a; font-weight: 700;">${safeName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Email Address:</td>
                                    <td style="padding: 6px 0; font-size: 15px; color: #0284c7; font-weight: 600;">
                                        <a href="mailto:${safeEmail}" style="color: #0284c7; text-decoration: underline;">${safeEmail}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Topic / Subject:</td>
                                    <td style="padding: 6px 0; font-size: 14px; color: #0f172a; font-weight: 600;">
                                        <span style="background-color: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700;">${safeSubject}</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        
                        <!-- Message Box -->
                        <div style="margin-bottom: 28px;">
                            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; margin-bottom: 10px;">Message Body</div>
                            <div style="background-color: #ffffff; border-left: 4px solid #0284c7; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; border-radius: 0 12px 12px 0; padding: 20px; font-size: 15px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${safeMessageHtml}</div>
                        </div>

                        <!-- Direct Reply Button -->
                        <div style="text-align: center; margin-top: 24px; margin-bottom: 8px;">
                            <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(safeSubject)}" style="display: inline-block; background-color: #0f172a; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 12px; box-shadow: 0 4px 12px rgba(15,23,42,0.15);">
                                ✉️ Reply Directly to ${safeName}
                            </a>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="background-color: #f8fafc; padding: 18px 28px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
                        Nithish Bharathwaj N Portfolio • Automated Contact Service
                    </div>
                </div>
            </body>
            </html>
        `;

        const visitorEmailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 24px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
                    
                    <!-- Header Banner -->
                    <div style="background: linear-gradient(135deg, #0f172a 0%, #0369a1 100%); padding: 36px 28px; color: #ffffff; text-align: center;">
                        <h1 style="margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; color: #ffffff;">Thank You for Reaching Out!</h1>
                        <p style="margin: 0; font-size: 14px; color: #bae6fd; font-weight: 500;">Your message has been received by Nithish Bharathwaj N.</p>
                    </div>
                    
                    <!-- Content Area -->
                    <div style="padding: 32px 28px;">
                        
                        <p style="font-size: 16px; color: #0f172a; margin-top: 0; margin-bottom: 16px; font-weight: 600;">
                            Hi ${safeName},
                        </p>
                        
                        <p style="font-size: 15px; line-height: 1.65; color: #334155; margin-bottom: 24px;">
                            Thank you for getting in touch regarding <strong>"${safeSubject}"</strong>. I have received your submission and will review it promptly. I typically respond within 24 hours.
                        </p>
                        
                        <!-- Summary Box -->
                        <div style="background-color: #f8fafc; border-radius: 14px; padding: 20px; margin-bottom: 28px; border: 1px solid #e2e8f0;">
                            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #0284c7; margin-bottom: 8px;">
                                Submission Summary
                            </div>
                            <div style="font-size: 13px; color: #64748b; margin-bottom: 10px;">
                                <strong>Topic:</strong> ${safeSubject}
                            </div>
                            <div style="font-size: 14px; line-height: 1.5; color: #334155; font-style: italic; background-color: #ffffff; padding: 12px 16px; border-radius: 8px; border: 1px solid #cbd5e1;">
                                "${safeMessageHtml}"
                            </div>
                        </div>

                        <!-- Professional Signature Card -->
                        <div style="border-top: 2px solid #f1f5f9; padding-top: 24px; margin-top: 24px;">
                            <div style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 2px;">
                                Nithish Bharathwaj N
                            </div>
                            <div style="font-size: 13px; font-weight: 600; color: #0284c7; margin-bottom: 12px;">
                                Cybersecurity Engineer • AI Engineer • Full-Stack Developer
                            </div>
                            <div style="font-size: 13px; color: #64748b; line-height: 1.6;">
                                🎓 B.E. CSE (Cyber Security) | 🏆 Top 8 Aerothon 2026 Finalist<br>
                                📧 <a href="mailto:nithishbharathwajn@gmail.com" style="color: #0284c7; text-decoration: none;">nithishbharathwajn@gmail.com</a> &nbsp;|&nbsp; 📞 +91 9363958388
                            </div>
                        </div>

                    </div>

                    <!-- Footer -->
                    <div style="background-color: #f8fafc; padding: 18px 28px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
                        This is an automated confirmation sent from nithishbharathwajn.com
                    </div>
                </div>
            </body>
            </html>
        `;

        // Strategy 1: Nodemailer (Gmail SMTP - allows sending to both owner and any visitor email address without domain restriction)
        if (gmailPass) {
            const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
            const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);

            const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpPort === 465,
                auth: { user: senderUser, pass: gmailPass },
            });

            await Promise.all([
                transporter.sendMail({
                    from: `"${safeName} via Portfolio" <${senderUser}>`,
                    to: recipientEmail,
                    replyTo: safeEmail,
                    subject: `📩 Portfolio Inquiry: ${safeSubject}`,
                    html: ownerEmailHtml,
                }),
                transporter.sendMail({
                    from: `"Nithish Bharathwaj N" <${senderUser}>`,
                    to: safeEmail,
                    subject: `Message Received: Thank you for reaching out, ${safeName}!`,
                    html: visitorEmailHtml,
                })
            ]);

            console.log(`[Contact API via Nodemailer] Sent notification to ${recipientEmail} & confirmation to ${safeEmail}`);
            return NextResponse.json({ message: 'Message delivered to owner & confirmation sent to visitor!' }, { status: 200 });
        }

        // Strategy 2: RESEND API (Fallback provider if RESEND_API_KEY is present)
        if (resendApiKey) {
            const resend = new Resend(resendApiKey);
            const fromSender = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

            // 1. Send notification email to owner (Nithish)
            const ownerRes = await resend.emails.send({
                from: fromSender,
                to: recipientEmail,
                replyTo: safeEmail,
                subject: `📩 Portfolio Inquiry: ${safeSubject}`,
                html: ownerEmailHtml,
            });

            console.log(`[Contact API via Resend] Owner notification sent:`, ownerRes);

            // 2. Try sending auto-reply confirmation to visitor
            try {
                const visitorRes = await resend.emails.send({
                    from: fromSender,
                    to: safeEmail,
                    subject: `Message Received: Thank you for reaching out, ${safeName}!`,
                    html: visitorEmailHtml,
                });
                console.log(`[Contact API via Resend] Visitor auto-reply status:`, visitorRes);
            } catch (visitorError: any) {
                console.warn(`[Contact API Note] Visitor auto-reply was not sent by Resend test mode (${visitorError?.message}). Resend requires verifying your domain to send auto-replies to external recipient emails.`);
            }

            return NextResponse.json({ message: 'Message delivered to your email!' }, { status: 200 });
        }

        // Strategy 3: Development Simulation Mode if no API keys are provided yet
        console.warn('[Contact API] Neither RESEND_API_KEY nor EMAIL_APP_PASSWORD is set in environment. Simulating email dispatch.');
        console.log(`[Simulated Mail to Owner]: To ${recipientEmail}, Subject: ${safeSubject}, From: ${safeName} (${safeEmail})`);
        console.log(`[Simulated Mail to Visitor]: To ${safeEmail}, Auto-reply delivered.`);

        return NextResponse.json({
            message: 'Form submitted successfully! (Set RESEND_API_KEY in .env to send live emails)'
        }, { status: 200 });

    } catch (error: any) {
        console.error('[Contact API Error]:', error);
        return NextResponse.json({
            error: 'Failed to dispatch emails: ' + (error?.message || 'Server error')
        }, { status: 500 });
    }
}

