// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Create web server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Set view engine
app.set('view engine', 'pug');

// Set static folder
app.use(express.static('public'));

// Set global variable
app.locals.pretty = true;

// Get data from json file
const fs = require('fs');
const commentData = require('./data/comment.json');

// Get home page
app.get('/', (req, res) => {
    res.render('index', { commentData: commentData });
});

// Get comment page
app.get('/comment', (req, res) => {
    res.render('comment');
});

// Post comment page
app.post('/comment', (req, res) => {
    // Get data from form
    let name = req.query.name;
    let comment = req.query.comment;

    // Create new comment
    let newComment = {
        name: name,
        comment: comment
    };

    // Add new comment to json file
    commentData.push(newComment);
    fs.writeFileSync('./data/comment.json', JSON.stringify(commentData));

    // Redirect to home page
    res.redirect('/');
});

// Get delete comment page
app.get('/delete', (req, res) => {
    // Get id from form
    let id = req.query.id;

    // Delete comment
    commentData.splice(id, 1);
    fs.writeFileSync('./data/comment.json', JSON.stringify(commentData));

    // Redirect to home page
    res.redirect('/');
});