import Stat from '../models/Stat.js';

export const getAllStats = async (req, res) => {
  try {
    // req.query values are normally strings, but Express's query parser turns
    // repeated keys (?group=a&group=b) into arrays — passing an array straight
    // into a Mongoose filter makes Mongoose treat it as an implicit $in match,
    // which isn't injection but is filter behavior the caller never asked for.
    // Only ever build the filter from a genuine string.
    const { group } = req.query;
    const filter = typeof group === 'string' && group ? { group } : {};
    const stats = await Stat.find(filter).sort({ group: 1, order: 1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
};

export const getStatByKey = async (req, res) => {
  try {
    const stat = await Stat.findOne({ key: req.params.key });

    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }

    res.json(stat);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stat', error: error.message });
  }
};

export const createStat = async (req, res) => {
  try {
    const { key, value } = req.body;

    if (!key || !value) {
      return res.status(400).json({ message: 'Key and value are required' });
    }

    const stat = new Stat(req.body);
    await stat.save();
    res.status(201).json({ message: 'Stat created successfully', stat });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create stat', error: error.message });
  }
};

export const updateStat = async (req, res) => {
  try {
    const { id } = req.params;
    const stat = await Stat.findByIdAndUpdate(id, req.body, { new: true });

    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }

    res.json({ message: 'Stat updated successfully', stat });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update stat', error: error.message });
  }
};

export const deleteStat = async (req, res) => {
  try {
    const { id } = req.params;
    const stat = await Stat.findByIdAndDelete(id);

    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete stat', error: error.message });
  }
};
