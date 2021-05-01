import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @dec Fetch all products
// @route GET /api/product
// @access Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @dec Fetch single product
// @route GET /api/product/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @dec delete product
// @route DELETE /api/product/:id
// @access private / admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.delete();
		res.json({ message: 'Product removed' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @dec create product
// @route POST /api/product
// @access private / admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		runReviews: 0,
		description: 'sample description',
	});

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
});

// @dec update product
// @route PUT /api/product/:id
// @access private / admin
const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, brand, category, image, countInStock } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct };
