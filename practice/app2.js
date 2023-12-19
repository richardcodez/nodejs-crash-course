const express = require('express');
// import express from 'express';

// express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');


//  LISTENING TO REQUESTS

// home page
app.get('/', (req, res) => {
    
    // res.send('<p>Home page</p>');
    console.log("----path----)");
    console.log(__dirname);
    res.sendFile('./views/index.html', { root: __dirname });

})

// about page
app.get('/about', (req, res) => {
    
    // res.send('<p>about page</p>');
    res.sendFile('./views/about.html', { root: __dirname });

})

// Redirecting
app.use('/about-us', (req, res) => {
    res.redirect('/about');
})

// 404 page: it has to be the last function => at the bottom
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname })
});

// listen for requests
// only store in a constant if you want to use it later
// for things like web socket
app.listen(3000);