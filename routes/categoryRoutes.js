const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const isAuth = require('../middleware/isAuther');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *       example:
 *         name: Electronics
 */

/**
 * @swagger
 * /category:
 *   get:
 *     security:
 *       - bearerAuth: []  
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Something went wrong.
 */

router.get('/', isAuth, async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /category:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: The category has been successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Something went wrong.
 */
router.post('/', isAuth, async (req, res) => {
    const category = new Category({
        name: req.body.name
    });

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;