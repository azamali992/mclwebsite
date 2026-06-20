import express from 'express';
import Contact from '../models/Contact.js';
import Newsletter from '../models/Newsletter.js';
import { sendContactNotification, sendNewsletterNotification } from '../utils/mailer.js';
import { formLimiter } from '../middleware/rateLimiters.js';

const router = express.Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/contact', formLimiter, async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }
  if (name.length > 200 || message.length > 5000 || (subject && subject.length > 200)) {
    return res.status(400).json({ message: 'Input exceeds maximum length' });
  }

  try {
    const submission = await Contact.create({ name, email, phone, subject, message });
    sendContactNotification(submission);
    res.json({ message: 'Message received successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit message', error: error.message });
  }
});

router.post('/newsletter', formLimiter, async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    await Newsletter.findOneAndUpdate(
      { email },
      { email },
      { upsert: true, setDefaultsOnInsert: true }
    );
    sendNewsletterNotification(email);
    res.json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to subscribe', error: error.message });
  }
});

export default router;
