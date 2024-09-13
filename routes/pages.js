const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();

// Route for home page
router.get('/', (req, res) => {
    res.render('index'); 
});

// Route for registration page
router.get('/register', (req, res) => {
    res.render('register');
});

// Route for login page
router.get('/login', (req, res) => {
    res.render('login'); 
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');  
});

router.use(cookieParser());

router.get('/logout', (req, res) => {

    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.redirect('/login');
});

router.get('/profile', (req, res) => {
    res.render('profile');  
});

// Update Profile Route
router.post('/profile/update', (req, res) => {
    res.redirect('/profile');
});



module.exports = router;
