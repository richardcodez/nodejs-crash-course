const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


// express app
const app = express();

// Connect to MongoDB
const dbURI = 'mongodb+srv://richardcodez:lcr856040@cluster0.6xln7ks.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => { app.listen(3000) })
    .catch((err) => {console.log(err)});

// Register view engine
app.set('view engine', 'ejs')


//  LISTENING TO REQUESTS

// listen for requests
// only store in a constant if you want to use it later
// for things like web socket

// Middleware and STatic files = public files = css, images
app.use(express.static('public'));
app.use(morgan('dev'));

// home page
app.get('/', (req, res) => {

    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Some content goes right here just for testing' },
        {title: 'MArio finds stars', snippet: 'Some content goes right here just for testing' },
        {title: 'How to defeat bowser', snippet: 'Some content goes right here just for testing' }
    ];
    res.render('index', { title: 'Home', blogs });

})

// about page
app.get('/about', (req, res) => {
    
    res.render('about', { title: 'About' });

});

// create blog
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});

// 404 page: it has to be the last function => at the bottom
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

