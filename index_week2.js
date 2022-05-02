import http from 'http';
import fs from 'fs';
import { parse } from "querystring";
import {getAll, getItem} from "./data.js";

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