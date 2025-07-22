const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Products retrieved successfully", data: products });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ message: "Product found", data: product });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, category, stock, imageUrls } = req.body;

  if (!name || !description || !price || !category) {
    return res
      .status(400)
      .json({ message: "Bad Request. Please provide all required fields." });
  }

  try {
    const existingProduct = await Product.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
      category,
    });

    if (existingProduct) {
      return res.status(409).json({
        message:
          "Conflict. A product with this name and category already exists.",
      });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrls,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({
      message: "Server error while creating product.",
      error: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { 
      new: true,
      runValidators: true
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });

  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({
      message: "Server error while updating product.",
      error: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found." });
      }

      res.status(204).send();

    } catch (err) {
      console.error("Error deleting product:", err);
      res.status(500).json({
        message: "Server error while deleting product.",
        error: err.message,
      });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
