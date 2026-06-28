import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ order: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, ...rest } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Product name is required' });
    }

    const product = new Product({
      name,
      ...rest,
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};
