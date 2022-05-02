// const http = require("http");
import http from 'http';
// const fs = require("fs");
import fs from 'fs';
import {getAll, getItem} from "./data.js";
http.createServer((req,res) => {
    var path = req.url.toLowerCase();
    let url = req.url.split("?"); // separate route from query string
    console.log(url);
    let query = parse(url[1]); // convert query string to a JS object
    switch(path) {
        case '/':
            fs.readFile("home.html", (err, data) => {
             if (err) return console.error(err);
                res.writeHead(200, {'Content-Type': 'text/html'});
             res.end(data.toString());
            });
            break;
        case '/about':
            fs.readFile("about.html", (err, data) => {
                if (err) return console.error(err);
                   res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data.toString());
               });
            break;
        case '/detail':
            fs.readFile("data.js", (err, data) => {
                if (err) return console.error(err);
                    res.writeHead(200, {'Content-Type': 'text/javascript'});
                res.end(data.toString());
                });
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 Not found');
            break;
    }
}).listen(process.env.PORT || 3000);