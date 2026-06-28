import Contact from '../models/Contact.js';
import Newsletter from '../models/Newsletter.js';
import { sendContactNotification, sendNewsletterNotification } from '../utils/mailer.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const submitContact = async (req, res) => {
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
    res.status(201).json({ message: 'Message received successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit message', error: error.message });
  }
};

export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    // Idempotent on purpose: upsert means retrying this request is always
    // safe and the caller can't distinguish/doesn't need to distinguish a
    // fresh subscribe from an already-subscribed email, so 200 here (rather
    // than conditionally 201) is an intentional choice, not an oversight.
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
};
