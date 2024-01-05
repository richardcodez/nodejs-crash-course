const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');


// express app
const app = express();

// Connect to MongoDB
const dbURI = 'mongodb+srv://richardcodez:lcr856040@cluster0.6xln7ks.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(() => { app.listen(3000) })
    .catch((err) => {console.log(err)});

// Register view engine
app.set('view engine', 'ejs')


//  LISTENING TO REQUESTS

// listen for requests
// only store in a constant if you want to use it later
// for things like web socket

// Middleware and STatic files = public files = css, images
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));   //comes with express, passess data into usable format
app.use(morgan('dev'));


// home page
app.get('/', (req, res) => {

    res.redirect('/blogs');

})

// about page
app.get('/about', (req, res) => {
    
    res.render('about', { title: 'About' });

});

// Blog Routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })
});

// handling POST REQUEST under create blog form
app.post('/blogs', (req, res) => {
    // receives request from /blogs
    const blog = new Blog(req.body);

    blog.save()
        .then( (result) => {
            res.redirect('/blogs');
        })
        .catch( (err) => {
            console.log(err);
        });
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then( (result) => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch( (err) => {
            console.log(err);
        })
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err)=>console.log(err));
})

// create blog
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});

// 404 page: it has to be the last function => at the bottom
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

