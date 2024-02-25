const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const User = require('../models/User');
const Order = require('../models/Order');
const isAuth = require('../middleware/isAuther');
const wrapAsync = require('../middleware/wrapAsync');




/**
 * @swagger
 * /place-order/{userId}:
 *   post:
 *     security:
 *      - bearerAuth: [] 
 *     summary: Place an order for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     responses:
 *       201:
 *         description: The order has been successfully created.
 *       404:
 *         description: User or Cart not found.
 *       500:
 *         description: Something went wrong.
 */
//  Order Placement Endpoint
router.post('/place-order/:userId', isAuth, wrapAsync(async (req, res) => {
    console.log('user');
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const cart = await Cart.findOne({ user: user._id }).populate('products.product');
        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        const order = new Order({
            user: user._id,
            products: cart.products,
        });

        await order.save();
        cart.products = [];
        await cart.save();

        res.status(201).send(order);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}));

/**
 * @swagger
 * /order-history/{userId}:
 *   get:       
 *     security:
 *      - bearerAuth: []
 *     summary: Get all order history for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: A list of orders.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Something went wrong.
 */
// Get all Order History: by user id
router.get('/order-history/:userId', isAuth, wrapAsync(async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const orders = await Order.find({ user: user._id }).populate('products.product');
        res.send(orders);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}));


/**
 * @swagger
 * /order-details/{orderId}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get order details by order ID
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID.
 *     responses:
 *       200:
 *         description: The order details.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Something went wrong.
 */
//  get Order Details by order id
router.get('/order-details/:orderId', isAuth, wrapAsync(async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId).populate('products.product');
        if (!order) {
            return res.status(404).send("Order not found");
        }

        res.send(order);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}));





module.exports = router;