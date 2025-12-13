import Product from "../models/productModel.js";

// ------------------------
// GET ALL PRODUCTS
// ------------------------
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ------------------------
// GET SINGLE PRODUCT
// ------------------------
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ------------------------
// CREATE PRODUCT
// ------------------------
export const createProduct = async (req, res) => {
  try {
    const { title, description, simpleDescription, price, category, image, keywords, stock } = req.body;

    // Validate required fields
    if (!title || !description || !simpleDescription || !price || !category || !image) {
      return res.status(400).json({ message: "Please provide all required fields: title, description, simpleDescription, price, category, image" });
    }

    // Validate price
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }

    // Validate stock if provided
    if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
      return res.status(400).json({ message: "Stock must be a non-negative number" });
    }

    const newProduct = await Product.create({
      title,
      description,
      simpleDescription,
      price,
      category,
      image,
      keywords,
      stock
    });
    res.status(201).json({ message: "Product created!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ------------------------
// UPDATE PRODUCT
// ------------------------
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { title, description, simpleDescription, price, category, image, keywords, stock } = req.body;

    // Validate price if provided
    if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }

    // Validate stock if provided
    if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
      return res.status(400).json({ message: "Stock must be a non-negative number" });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.simpleDescription = simpleDescription || product.simpleDescription;
    product.price = price || product.price;
    product.category = category || product.category;
    product.image = image || product.image;
    product.keywords = keywords || product.keywords;
    product.stock = stock !== undefined ? stock : product.stock;

    const updatedProduct = await product.save();
    res.json({ message: "Product updated!", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ------------------------
// DELETE PRODUCT
// ------------------------
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.remove();
    res.json({ message: "Product deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
