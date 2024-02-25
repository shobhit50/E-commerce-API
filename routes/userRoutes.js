const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');





/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *         email:
 *           type: string
 *           description: The user's email.
 *         password:
 *           type: string
 *           description: The user's password.
 *       example:
 *         name: John Doe
 *         email: john@example.com
 *         password: mypassword
 */
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The registered user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User already exists
 *       500:
 *         description: An error occurred
 */
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.findOne({ name });
        if (newUser) {
            return res.status(400).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save()
        res.send(user);
    } catch (error) {
        res.status(500).send('An error occurred');
    }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: John Doe
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: mypassword
 *     responses:
 *       200:
 *         description: Logged in
 *       400:
 *         description: Cannot find user or Incorrect password
 *       500:
 *         description: An error occurred
 */
router.post('/login', async (req, res) => {
    try {
        const token = req.header('auth-token');
        if (token && token.startsWith('Bearer ')) {
            try {
                token = token.slice(7, token.length);
                const verified = jwt.verify(token, 'your-secret-key');
                if (verified) {
                    return res.status(400).send('Already logged in');
                }
            } catch (error) {
                return res.status(400).send('Invalid token');

            }
        }

        const user = await User.findOne({ name: req.body.name });
        if (!user) {
            return res.status(400).send('Cannot find user');
        }
        if (!(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(400).json({
                message: 'Incorrect password',
            });
        }

        // Create and assign a token
        const newToken = jwt.sign({ _id: user._id }, 'your-secret-key', { expiresIn: '1h' });
        console.log(newToken);
        res.header('auth-token', newToken).send(newToken);
    } catch (error) {
        res.status(500).send('An error occurred');
    }
});

module.exports = router;