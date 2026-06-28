import Content from '../models/Content.js';

export const getAllContent = async (req, res) => {
  try {
    const content = await Content.find().sort({ section: 1, order: 1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch content', error: error.message });
  }
};

export const getContentBySection = async (req, res) => {
  try {
    const { section } = req.params;
    const content = await Content.find({ section, isActive: true }).sort({ order: 1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch content', error: error.message });
  }
};

export const getContentByKey = async (req, res) => {
  try {
    const { section, key } = req.params;
    const content = await Content.findOne({ section, key });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch content', error: error.message });
  }
};

export const createContent = async (req, res) => {
  try {
    const { section, key, ...rest } = req.body;

    if (!section || !key) {
      return res.status(400).json({ message: 'Section and key are required' });
    }

    const content = new Content({
      section,
      key,
      ...rest,
    });

    await content.save();
    res.status(201).json({ message: 'Content created successfully', content });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create content', error: error.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findByIdAndUpdate(id, req.body, { new: true });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json({ message: 'Content updated successfully', content });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update content', error: error.message });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findByIdAndDelete(id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete content', error: error.message });
  }
};
