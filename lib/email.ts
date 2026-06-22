import nodemailer from 'nodemailer';

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

interface BookingEmailDetails {
  to: string;
  firstName: string;
  lastName: string;
  reason: string;
  calendarUrl: string;
}

/**
 * Sends the booking confirmation email. If SMTP credentials are not yet
 * configured (see .env.example) this logs the email to the console instead
 * of throwing, so local development and demos still work end-to-end.
 */
export async function sendBookingConfirmation(details: BookingEmailDetails) {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || 'huw.latimer.audiologist@gmail.com';

  const subject = 'Your appointment request — Huw Latimer Hearing Care';
  const html = `
    <div style="font-family: sans-serif; color: #3B332C; line-height: 1.6;">
      <h2 style="color: #5E7349;">Thank you, ${details.firstName}.</h2>
      <p>Your appointment request has been received.</p>
      <p><strong>Reason for appointment:</strong> ${details.reason}</p>
      <p>Your appointment will be conducted at
        <a href="https://www.vineyhearingcare.co.uk/" style="color:#C17F59;">Viney Hearing Care</a>,
        where I am a resident practitioner. We will be in touch shortly to confirm
        the exact date and time.</p>
      <p>
        <a href="${details.calendarUrl}"
           style="display:inline-block; padding:10px 20px; background:#5E7349; color:#F6F1EA; border-radius:6px; text-decoration:none;">
          Add to Google Calendar
        </a>
      </p>
      <p style="font-size: 0.85em; color: #5C5147;">
        If you did not request this appointment, please contact us so we can remove your details.
      </p>
    </div>
  `;

  if (!transporter) {
    // eslint-disable-next-line no-console
    console.log('--- SMTP not configured: booking email below was not sent ---');
    // eslint-disable-next-line no-console
    console.log({ to: details.to, subject, html });
    return { sent: false };
  }

  await transporter.sendMail({
    from,
    to: details.to,
    subject,
    html,
  });

  return { sent: true };
}

interface ReferralEmailDetails {
  referrerFirstName: string;
  referrerLastName: string;
  referrerEmail: string;
  referrerPhone?: string;
  patientName: string;
}

export async function sendReferralNotification(details: ReferralEmailDetails) {
  const transporter = getTransporter();
  const notifyEmail = process.env.NOTIFY_EMAIL;
  const from = process.env.SMTP_FROM || 'huw.latimer.audiologist@gmail.com';

  if (!notifyEmail) {
    // eslint-disable-next-line no-console
    console.log('--- NOTIFY_EMAIL not set: referral notification below was not sent ---');
    // eslint-disable-next-line no-console
    console.log(details);
    return { sent: false };
  }

  const subject = `New Referral — ${details.referrerFirstName} ${details.referrerLastName}`;
  const html = `
    <div style="font-family: sans-serif; color: #3B332C; line-height: 1.6;">
      <h2 style="color: #5E7349;">New Referral Received</h2>
      <p>A new referral has been submitted via the website.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 480px;">
        <tr><td style="padding: 6px 0; font-weight: bold;">Referrer name</td><td style="padding: 6px 0;">${details.referrerFirstName} ${details.referrerLastName}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Referrer email</td><td style="padding: 6px 0;">${details.referrerEmail}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Referrer phone</td><td style="padding: 6px 0;">${details.referrerPhone || '—'}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Referred patient</td><td style="padding: 6px 0;">${details.patientName}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Submitted at</td><td style="padding: 6px 0;">${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</td></tr>
      </table>
      <p style="margin-top: 16px;">Please reach out to <strong>${details.patientName}</strong> to arrange their appointment.</p>
    </div>
  `;

  if (!transporter) {
    // eslint-disable-next-line no-console
    console.log('--- SMTP not configured: referral notification email below was not sent ---');
    // eslint-disable-next-line no-console
    console.log({ to: notifyEmail, subject, html });
    return { sent: false };
  }

  await transporter.sendMail({ from, to: notifyEmail, subject, html });
  return { sent: true };
}

export async function sendReferralConfirmation(details: ReferralEmailDetails) {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || 'huw.latimer.audiologist@gmail.com';

  const subject = 'Your referral has been received — Huw Latimer Hearing Care';
  const html = `
    <div style="font-family: sans-serif; color: #3B332C; line-height: 1.6;">
      <h2 style="color: #5E7349;">Thank you, ${details.referrerFirstName}!</h2>
      <p>We have received your referral for <strong>${details.patientName}</strong>.</p>
      <p>Here is a summary of what happens next:</p>
      <ul>
        <li>Our team will contact <strong>${details.patientName}</strong> to arrange a convenient appointment.</li>
        <li>Once they attend, your referral will be confirmed and we will notify you.</li>
        <li>You will receive your <strong>£30 reward</strong> shortly after their appointment takes place.</li>
      </ul>
      <p>If you have any questions in the meantime, please do not hesitate to get in touch.</p>
      <p style="font-size: 0.85em; color: #5C5147; margin-top: 24px;">
        If you did not submit this referral, please contact us so we can remove your details.
      </p>
    </div>
  `;

  if (!transporter) {
    // eslint-disable-next-line no-console
    console.log('--- SMTP not configured: referral confirmation email below was not sent ---');
    // eslint-disable-next-line no-console
    console.log({ to: details.referrerEmail, subject, html });
    return { sent: false };
  }

  await transporter.sendMail({ from, to: details.referrerEmail, subject, html });
  return { sent: true };
}

/**
 * Builds a Google Calendar "quick add" event link for the appointment.
 * The exact date/time is not yet known at booking time, so this defaults to
 * a placeholder one-hour slot one week from now that the practitioner can
 * adjust once the appointment is scheduled.
 */
export function buildGoogleCalendarUrl(reason: string) {
  const start = new Date();
  start.setDate(start.getDate() + 7);
  start.setHours(9, 0, 0, 0);
  const end = new Date(start);
  end.setHours(start.getHours() + 1);

  const format = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Hearing Care Appointment — ${reason}`,
    dates: `${format(start)}/${format(end)}`,
    details:
      'Appointment at Viney Hearing Care (https://www.vineyhearingcare.co.uk/). Please arrive 5 minutes early.',
    location: 'Viney Hearing Care, High Street, Newtown, United Kingdom',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
