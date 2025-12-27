import Product from "../models/productModel.js";

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("Get product by ID error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
export const createProduct = async (req, res) => {
  try {
    const { title, description, simpleDescription, price, category, image, keywords, stock } = req.body;

    // 1. Validate required fields
    if (!title || !description || !simpleDescription || !price || !category || !image) {
      return res.status(400).json({ message: "Missing required product fields" });
    }

    // 2. Validate price and stock
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }
    if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
      return res.status(400).json({ message: "Stock must be a non-negative number" });
    }

    // 3. Create product
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
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { title, description, simpleDescription, price, category, image, keywords, stock } = req.body;

    // 1. Validation (if provided)
    if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }
    if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
      return res.status(400).json({ message: "Stock must be a non-negative number" });
    }

    // 2. Update fields
    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.simpleDescription = simpleDescription ?? product.simpleDescription;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.image = image ?? product.image;
    product.keywords = keywords ?? product.keywords;
    product.stock = stock ?? product.stock;

    const updatedProduct = await product.save();
    res.json({ message: "Product updated!", product: updatedProduct });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
export const deleteProduct = async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted!" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
