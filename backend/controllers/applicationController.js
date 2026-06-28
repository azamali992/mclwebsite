import Application from '../models/Application.js';

export const getAllApplications = async (req, res) => {
  try {
    // Only build the filter from genuine strings — a repeated query key
    // (?status=a&status=b) parses to an array, which Mongoose would treat as
    // an implicit $in match rather than the single-value filter the admin
    // UI's dropdown actually sends.
    const filter = {};
    if (typeof req.query.jobId === 'string' && req.query.jobId) filter.jobId = req.query.jobId;
    if (typeof req.query.status === 'string' && req.query.status) filter.status = req.query.status;

    const applications = await Application.find(filter)
      .populate('jobId', 'position department location')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'reviewed', 'rejected', 'hired'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findByIdAndUpdate(id, { status }, { new: true });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application updated successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update application', error: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete application', error: error.message });
  }
};
