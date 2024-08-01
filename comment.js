//create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'comment'
});
connection.connect();

//use static file
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

//set view engine
app.set('view engine', 'pug');
app.set('views', './views');

//create route
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/comment', function (req, res) {
    var sql = 'SELECT * FROM comment';
    connection.query(sql, function (err, comments, fields) {
        if (err) throw err;
        res.render('comment', {
            comments: comments
        });
    });
});

app.post('/comment', function (req, res) {
    var name = req.body.name;
    var comment = req.body.comment;
    var sql = 'INSERT INTO comment(name, comment) VALUES(?, ?)';
    connection.query(sql, [name, comment], function (err, result, fields) {
        if (err) throw err;
        res.redirect('/comment');
    });
});

app.listen(3000, function () {
    console.log('Server is running on port 3000');
});