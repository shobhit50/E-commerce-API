const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const isAuth = require('../middleware/isAuther');




/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - description
 *         - availability
 *         - category
 *       properties:
 *         title:
 *           type: string
 *           description: The product's title.
 *         price:
 *           type: number
 *           description: The product's price.
 *         description:
 *           type: string
 *           description: The product's description.
 *         availability:
 *           type: boolean
 *           description: The product's availability.
 *         category:
 *           type: string
 *           description: The product's category. This is a MongoDB ObjectId referencing the Category document.
 */

/**
 * @swagger
 * /product/category/{categoryId}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get products by category ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID.
 *     responses:
 *       200:
 *         description: A list of products in the category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: An error occurred.
 */

// Endpoint to get products by category Id
router.get('/category/:categoryId', isAuth, async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.categoryId })
            .select('title price description availability');
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
/**
 * @swagger
 * /product/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get product details by product ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: The product details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Cannot find product.
 *       500:
 *         description: An error occurred.
 */
// Endpoint to get product details by product Id
router.get('/:id', isAuth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }
        res.json(product);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});




/**
 * @swagger
 * /product:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: An error occurred.
 */

// Endpoint to create a new product
router.post('/', isAuth, async (req, res) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        availability: req.body.availability,
        category: req.body.categoryId
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;