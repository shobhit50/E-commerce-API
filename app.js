const Express = require('express');
const app = Express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const ExpressEroor = require('./middleware/expressError.js');



main().then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');
}

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // path to the files where you'll write the documentation
};

const specs = swaggerJsdoc(options);




app.use(Express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);













app.all("*", (req, res, next) => {
    next(new ExpressEroor(400, "page not found"));
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});