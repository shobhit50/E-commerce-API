const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const User = require('../models/User');
const isAuth = require('../middleware/isAuther');
const isOwner = require('../middleware/Isuser');



/**
 * @swagger
 * /{userId}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add product to cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: The product ID.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product.
 *     responses:
 *       201:
 *         description: The product has been successfully added to the cart.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Something went wrong.
 */
//  add product to cart
router.post('/:userId', isAuth, async (req, res) => {
    const { product, quantity } = req.body;
    const user = req.params.userId;

    try {
        let cart = await Cart.findOne({ user });

        if (cart) {
            // If cart exists for the user
            let itemIndex = cart.products.findIndex(p => p.product == product);

            if (itemIndex > -1) {
                // If product exists in the cart, update the quantity
                let productItem = cart.products[itemIndex];
                productItem.quantity = quantity;
                cart.products[itemIndex] = productItem;
            } else {
                // If product does not exist in cart, add new item
                cart.products.push({ product, quantity });
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            // No cart for user, create new cart
            const newCart = await Cart.create({
                user,
                products: [{ product, quantity }]
            });

            return res.status(201).send(newCart);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

/**
 * @swagger
 * /cart/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get cart by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: The cart details.
 *       404:
 *         description: User or Cart not found.
 *       500:
 *         description: Something went wrong.
 */
// Endpoint to get cart by user id
router.get('/:userId', isAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const cart = await Cart.findOne({ user: user._id });
        if (!cart) {
            return res.status(404).send("Cart not found");
        }
        res.send(cart);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});



/**
 * @swagger
 * /cart/{userId}/{productId}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove product from cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:              
 *           type: string
 *         description: The product ID.
 *     responses:
 *       201:
 *         description: The product has been successfully removed from the cart.
 *       404:
 *         description: User, Cart or Product not found.
 *       500:
 *         description: Something went wrong.
 */
//  remove product from cart
router.delete('/:userId/:productId', isAuth, async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        let cart = await Cart.findOne({ user: user._id }).populate('products.product');
        let itemIndex = cart.products.findIndex(p => p.product._id.toString() === productId);
        if (itemIndex > -1) {
            // If product exists in the cart, delete item from cart
            cart.products.splice(itemIndex, 1);
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            return res.status(404).send("Product not found in cart");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

module.exports = router;