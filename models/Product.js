const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    image: {
        type: String
    }
    ,
    availability: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);