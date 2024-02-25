const Cart = require('../models/Cart');



const isOwner = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Check if the logged-in user is the owner of the cart
        if (req.user._id.toString() !== cart.user.toString()) {
            return res.status(403).json({ message: 'User is not the owner of the cart' });
        }

        // If the user is the owner, add the cart to the request object and proceed
        req.cart = cart;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = isOwner;