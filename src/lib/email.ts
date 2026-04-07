// Email sending abstraction — provider to be configured later
// Supports Resend, Nodemailer/SMTP, or any other provider

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export interface EmailProvider {
  send(options: EmailOptions): Promise<{ success: boolean; id?: string }>;
}

// Console logger provider for development
class ConsoleEmailProvider implements EmailProvider {
  async send(options: EmailOptions) {
    console.log("=== EMAIL SENT (dev mode) ===");
    console.log(`To: ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`From: ${options.from || "noreply@aba2026.thecrayfish.tech"}`);
    console.log("Body:", options.html.substring(0, 200) + "...");
    console.log("=============================");
    return { success: true, id: `dev-${Date.now()}` };
  }
}

// Singleton email provider — swap implementation when ready
let emailProvider: EmailProvider = new ConsoleEmailProvider();

export function setEmailProvider(provider: EmailProvider) {
  emailProvider = provider;
}

export async function sendEmail(options: EmailOptions) {
  return emailProvider.send({
    ...options,
    from: options.from || "42nd ABA Conference <noreply@aba2026.thecrayfish.tech>",
  });
}

// Pre-built email templates

export function registrationConfirmationEmail(data: {
  name: string;
  referenceNumber: string;
  type: string;
  membershipType: string;
  totalAmount: number;
  currency: string;
  delegateCount: number;
}) {
  return {
    subject: `Registration Confirmed — 42nd ABA Conference (Ref: ${data.referenceNumber})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e3a5f; padding: 24px; text-align: center;">
          <h1 style="color: #bf9436; margin: 0; font-size: 24px;">42nd ABA General Meeting & Conference</h1>
          <p style="color: white; margin: 8px 0 0;">September 1-3, 2026 | Kurumba Resort, Maldives</p>
        </div>
        <div style="padding: 24px; background: #f8f4f0;">
          <h2 style="color: #1e3a5f;">Registration Received</h2>
          <p>Dear ${data.name},</p>
          <p>Thank you for registering for the 42nd ABA General Meeting & Conference.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Reference</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.referenceNumber}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Type</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.type}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Membership</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.membershipType}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Delegates</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.delegateCount}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Total Amount</td><td style="padding: 8px; font-size: 18px; color: #E31837;">${data.currency} ${data.totalAmount.toLocaleString()}</td></tr>
          </table>
          <p>You will receive payment instructions shortly.</p>
          <p style="color: #666; font-size: 14px;">If you have any questions, please contact us at conference@bankofmaldives.com.mv</p>
        </div>
        <div style="background: #1e3a5f; padding: 16px; text-align: center; color: #999; font-size: 12px;">
          <p>Asian Bankers Association | Bank of Maldives</p>
        </div>
      </div>
    `,
  };
}

export function paymentLinkEmail(data: {
  name: string;
  referenceNumber: string;
  amount: number;
  currency: string;
  paymentUrl?: string;
}) {
  return {
    subject: `Payment Required — 42nd ABA Conference (Ref: ${data.referenceNumber})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e3a5f; padding: 24px; text-align: center;">
          <h1 style="color: #bf9436; margin: 0; font-size: 24px;">42nd ABA General Meeting & Conference</h1>
        </div>
        <div style="padding: 24px; background: #f8f4f0;">
          <h2 style="color: #1e3a5f;">Payment Required</h2>
          <p>Dear ${data.name},</p>
          <p>Please complete your payment for the 42nd ABA conference.</p>
          <p style="font-size: 24px; text-align: center; color: #E31837; font-weight: bold;">${data.currency} ${data.amount.toLocaleString()}</p>
          <p style="text-align: center; font-size: 14px; color: #666;">Reference: ${data.referenceNumber}</p>
          ${data.paymentUrl ? `<div style="text-align: center; margin: 24px 0;"><a href="${data.paymentUrl}" style="background: #E31837; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: bold;">Pay Now</a></div>` : ""}
          <p>For bank transfer, please use the reference number above and contact us for banking details.</p>
        </div>
        <div style="background: #1e3a5f; padding: 16px; text-align: center; color: #999; font-size: 12px;">
          <p>Asian Bankers Association | Bank of Maldives</p>
        </div>
      </div>
    `,
  };
}
