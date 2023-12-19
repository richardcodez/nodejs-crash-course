const express = require('express');
// import express from 'express';

// express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');


//  LISTENING TO REQUESTS

// home page
app.get('/', (req, res) => {
    
    res.render('index', { title: 'Home' });

})

// about page
app.get('/about', (req, res) => {
    
    res.render('about');

});

// create blog
app.get('/blogs/create', (req, res) => {
    res.render('create');
});

// 404 page: it has to be the last function => at the bottom
app.use((req, res) => {
    res.status(404).render('404');
});

// listen for requests
// only store in a constant if you want to use it later
// for things like web socket
app.listen(3000);