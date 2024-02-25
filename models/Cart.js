const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cartSchema = new Schema({
    products: [
        {
            product: {
                type: Object,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
