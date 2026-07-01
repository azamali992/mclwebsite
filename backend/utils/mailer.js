import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = null;

// Every notification email below interpolates fields submitted through
// public, unauthenticated forms (contact, newsletter, job application)
// directly into an HTML email body read by staff. Without escaping, a
// submitter can inject arbitrary HTML/script into the notification — e.g.
// a "name" of `<img src=x onerror=...>` or a phishing link styled to look
// like a legitimate MCL notice. Escaping the five HTML-significant
// characters before interpolation closes this off entirely; nothing here
// needs to render as HTML, it's all plain user-submitted text.
export function escapeHtml(value) {
  if (value == null) return value;
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export async function sendApplicationNotification(jobTitle, applicant) {
  const { fullname, email, phone, experience, message } = applicant;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (!notificationEmail) {
    console.warn('NOTIFICATION_EMAIL not set — skipping notification email');
    return;
  }

  try {
    await getTransporter().sendMail({
      from: `"MCL Careers" <${process.env.SMTP_USER}>`,
      to: notificationEmail,
      subject: `New Application: ${escapeHtml(fullname)} — ${escapeHtml(jobTitle)}`,
      html: `
        <h2>New Job Application</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Position</td><td style="padding:8px">${escapeHtml(jobTitle)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Full Name</td><td style="padding:8px">${escapeHtml(fullname)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${escapeHtml(phone) || 'N/A'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Experience</td><td style="padding:8px">${escapeHtml(experience) || 'N/A'}</td></tr>
        </table>
        <h3>Cover Letter</h3>
        <p style="white-space:pre-wrap">${escapeHtml(message) || 'N/A'}</p>
      `,
    });
    console.log('Notification email sent to', notificationEmail);
  } catch (err) {
    console.error('Failed to send notification email:', err.message);
  }
}

export async function sendContactNotification(submission) {
  const { name, email, phone, subject, message } = submission;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (!notificationEmail) {
    console.warn('NOTIFICATION_EMAIL not set — skipping notification email');
    return;
  }

  try {
    await getTransporter().sendMail({
      from: `"MCL Website" <${process.env.SMTP_USER}>`,
      to: notificationEmail,
      subject: `New Contact Form Submission: ${escapeHtml(subject) || 'No subject'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${escapeHtml(phone) || 'N/A'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Subject</td><td style="padding:8px">${escapeHtml(subject) || 'N/A'}</td></tr>
        </table>
        <h3>Message</h3>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });
    console.log('Contact notification email sent to', notificationEmail);
  } catch (err) {
    console.error('Failed to send contact notification email:', err.message);
  }
}

export async function sendNewsletterNotification(email) {
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (!notificationEmail) {
    console.warn('NOTIFICATION_EMAIL not set — skipping notification email');
    return;
  }

  try {
    await getTransporter().sendMail({
      from: `"MCL Website" <${process.env.SMTP_USER}>`,
      to: notificationEmail,
      subject: 'New Newsletter Signup',
      html: `<p>New newsletter signup: <strong>${escapeHtml(email)}</strong></p>`,
    });
    console.log('Newsletter notification email sent to', notificationEmail);
  } catch (err) {
    console.error('Failed to send newsletter notification email:', err.message);
  }
}

export async function sendConfirmationToApplicant(applicantEmail, applicantName, jobTitle) {
  try {
    await getTransporter().sendMail({
      from: `"MCL Careers" <${process.env.SMTP_USER}>`,
      to: applicantEmail,
      subject: `Application Received — ${escapeHtml(jobTitle)}`,
      html: `
        <h2>Thank You for Your Application</h2>
        <p>Dear ${escapeHtml(applicantName)},</p>
        <p>We have received your application for the position of <strong>${escapeHtml(jobTitle)}</strong>.</p>
        <p>Our HR team will review your qualifications and experience. If your profile matches our requirements, we will contact you for the next steps.</p>
        <p>We appreciate your interest in joining Multan Chemicals Limited.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>MCL HR Team</strong></p>
      `,
    });
    console.log('Confirmation email sent to', applicantEmail);
  } catch (err) {
    console.error('Failed to send confirmation email:', err.message);
  }
}
