const express = require('express');
const path = require('path');
const pages = require('./routes/pages');
const auth = require('./routes/auth');

const app = express();
const PORT = 3000;

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.set('view engine', 'hbs');

// Use the pages router
app.use('/', pages);
app.use('/auth', auth);


// Start the server
app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is running on port ${PORT}`);
    } else {
        console.error("Error occurred:", error);
    }
});
