import Career from '../models/Career.js';

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

export const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findByIdAndDelete(id);

    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }

    res.json({ message: 'Career deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete career', error: error.message });
  }
};
