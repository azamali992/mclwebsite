import fs from 'fs';
import mongoose from 'mongoose';
import Career from '../models/Career.js';
import Application from '../models/Application.js';
import { sendApplicationNotification, sendConfirmationToApplicant } from '../utils/mailer.js';
import { verifyFileSignature } from '../utils/fileSignature.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find({ isActive: true });
    res.json(careers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch careers', error: error.message });
  }
};

export const getCareerById = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findById(id);

    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }

    res.json(career);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch career', error: error.message });
  }
};

export const createCareer = async (req, res) => {
  try {
    const { position, ...rest } = req.body;

    if (!position) {
      return res.status(400).json({ message: 'Position is required' });
    }

    const career = new Career({
      position,
      ...rest,
    });

    await career.save();
    res.status(201).json({ message: 'Career posted successfully', career });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create career', error: error.message });
  }
};

export const updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findByIdAndUpdate(id, req.body, { new: true });

    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }

    res.json({ message: 'Career updated successfully', career });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update career', error: error.message });
  }
};

// Soft-delete: flips isActive to false instead of a hard delete. A hard
// delete would leave Application.jobId pointing at a now-nonexistent Career
// document, and getAllApplications' .populate('jobId') would silently
// return jobId: null for those orphaned applications with no indication to
// the admin UI why. Career already has an isActive flag that every public
// read (getAllCareers, the chatbot's getLiveCareersContext) filters on, so
// this reuses an existing convention rather than introducing a new one.
export const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findByIdAndUpdate(id, { isActive: false }, { new: true });

    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete career', error: error.message });
  }
};

export const applyToJob = async (req, res) => {
  const { jobId, fullname, email, phone, experience, message } = req.body;

  if (!jobId || !fullname || !email) {
    return res.status(400).json({ message: 'Job ID, name, and email are required' });
  }
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: 'Invalid job ID' });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }
  if (req.file && !verifyFileSignature(req.file.path, req.file.mimetype)) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ message: 'Resume file content does not match its declared type.' });
  }

  try {
    const career = await Career.findById(jobId);
    if (!career) {
      return res.status(404).json({ message: 'Job posting not found' });
    }

    const resume = req.file
      ? { url: `/uploads/resumes/${req.file.filename}`, filename: req.file.filename }
      : undefined;

    const application = await new Application({
      jobId, fullname, email, phone, experience, message, resume,
    }).save();

    console.log('Job application saved:', { position: career.position, fullname, email });

    sendApplicationNotification(career.position, { fullname, email, phone, experience, message });
    sendConfirmationToApplicant(email, fullname, career.position);

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    console.error('Failed to save application:', error.message);
    res.status(500).json({ message: 'Failed to submit application', error: error.message });
  }
};
