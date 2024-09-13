const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 

exports.register = async (req, res) => {
    console.log(req.body);

    const { name, email, password, confirmPassword } = req.body;

    // Check if all required fields are filled
    if (!name || !email || !password || !confirmPassword) {
        return res.render('register', {
            message: 'All fields are required'
        });
    }

    try {
        // Check if the email is already in use
        const existingUser = await User.findOne({ 
            where: { email } 
        });
        
        if (existingUser) {
            return res.render('register', {
                message: 'This email is already in use'
            });
        }
        
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        // Create a new user
        await User.create({ 
            name: name, 
            email: email, 
            password: hashedPassword 
        });

        return res.render('register', {
            message: 'User Registered'
        });

    } catch (error) {
        console.log(error);
        return res.render('register', {
            message: 'Internal Server Error'
        });
    }
};

exports.login = async (req, res) => {
    console.log(req.body);
    
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        // Ensure password
        if (!user || !user.password) {
            return res.render('login', { 
                message: 'Invalid email or password' 
            });
        }

        const match = await bcrypt.compare(password, user.password);
        console.log(match);

        if (!match) {
            return res.render('login', { 
                message: 'Invalid email or password' 
            });
        }

        const token = jwt.sign({ 
            id: user.id, 
            email: user.email 
        }, 'your_jwt_secret', { 
            expiresIn: '1h' 
        });
        console.log('token', token);
        res.send({token: token});
        res.cookie('token', token, { 
            httpOnly: true
        });

        return res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
        return res.render('login', { 
            message: 'Internal Server Error' 
        });
    }
};

exports.logout = (req, res) => {
    console.log(req.body);

    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, 'your_jwt_secret', async (err, decoded) => {
        if (err) {
            return res.redirect('/login');
        }

        try {
            const user = await User.findByPk(decoded.id);
            res.render('dashboard', { 
                user
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });
};

exports.profileupdate = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    } 
};