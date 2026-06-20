import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = null;

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
      subject: `New Application: ${fullname} — ${jobTitle}`,
      html: `
        <h2>New Job Application</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Position</td><td style="padding:8px">${jobTitle}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Full Name</td><td style="padding:8px">${fullname}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone || 'N/A'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Experience</td><td style="padding:8px">${experience || 'N/A'}</td></tr>
        </table>
        <h3>Cover Letter</h3>
        <p style="white-space:pre-wrap">${message || 'N/A'}</p>
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
      subject: `New Contact Form Submission: ${subject || 'No subject'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone || 'N/A'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Subject</td><td style="padding:8px">${subject || 'N/A'}</td></tr>
        </table>
        <h3>Message</h3>
        <p style="white-space:pre-wrap">${message}</p>
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
      html: `<p>New newsletter signup: <strong>${email}</strong></p>`,
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
      subject: `Application Received — ${jobTitle}`,
      html: `
        <h2>Thank You for Your Application</h2>
        <p>Dear ${applicantName},</p>
        <p>We have received your application for the position of <strong>${jobTitle}</strong>.</p>
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
