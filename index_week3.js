import http from 'http';
import fs from 'fs';
import path from 'path';
import { parse } from "querystring";
import * as movie from "./data.js";
import express from 'express';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json());
app.set('view engine', 'ejs'); // set the view engine to ejs

// send static file as response
app.get('/', (req,res) => {
    res.type('text/html');
    res.render('home', { movies: movie.getAll()}); // send content of 'home' view to browser
    // res.sendFile(path.join(__dirname, './home.html'));
});

app.get('/detail', (req,res) => {
    console.log(req.query);
    let result = movie.getItem(req.query.title);
    res.render("detail", {
        title: req.query.title, 
        result
        }
    );
});

/*
app.get('/detail', (req,res) => {
    res.type('text/html');
    console.log(req.query);
    res.end("Detail for " + req.query["name"]);
    // res.sendFile(path.join(__dirname, './home.html'));
});
*/

app.post('/detail', (req,res) => {
    res.type('text/html');
    console.log(req.body);
    res.end("Detail for " + req.body["title"]);
    // res.sendFile(path.join(__dirname, './home.html'));
});

// send plain text response
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About page');
});
   
// define 404 handler
app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});

/*
function serverStatic(res, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;
    console.log(__dirname + path);
    fs.readFile(__dirname + path, function(err, data){
        if(err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
        }
        else{
            res.writeHead(responseCode, {'Content-Type': contentType});
            res.end(data);
        }
    });
}

http.createServer(function(req, res){
    console.log('createServer got request');
    var path = req.url.toLowerCase();
    console.log(path);
    let url_parts = req.url.split("?"); // separate route from query string
    console.log(url_parts);
    let query = parse(url_parts[1]); // convert query string to a JS object
    console.log(query);

    switch(url_parts[0]) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Home page');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About');
            break;
        case '/detail':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Detail for ' + query["name"]);
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 : Not found');
    }
}).listen(process.env.PORT || 3000);

console.log('after createServer');
*/