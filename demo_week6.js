// index_week6.jsをコピーして、GitHubの授業内で扱わなかったコードたちを試したもの

import http from 'http';
import fs from 'fs';
import path from 'path';
import { parse } from "querystring";
import * as movie from "./data.js";
import express from 'express';
import { Movies } from "./Movies.js";
////////////////////////////////////////////// added this week
import cors from 'cors';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json());
app.set('view engine', 'ejs'); // set the view engine to ejs

// send static file as response
app.get('/', (req,res) => {
    Movies.find({}).lean()
        .then((movies) => {
        // respond to browser only after db query completes
            res.render('home', { movies });
        })
        .catch(err => next(err));
});

////////////////////////////////////////////// added this week
// app.get('/api/movies', (req,res) => {
//     // 単純ver. getAllでデータを返すだけ
//     // res.json(movie.getAll());
//     // 複雑ver. エラーのとき、ユーザーにエラーであることを教えてあげる必要があるからエラーを伝えるコードが入っているver.
//     // try/catch文は、予想していない異常によりエラーが発生するような場面で意図的にエラーを回避するための処理。参考 → https://www.sejuku.net/blog/29293
//     try {
//         let movies = movie.getAll();
//         res.json(movie.getAll());
//     } catch {
//         return res.status(500).send('Database Error occurred');
//     }
// });

////////////////////////////////////////////// お試し
////////////////////////////////////////////// ひとつ上のコードの束(try, catchのやつ)と実行結果は同じ。if/else文ver.
app.get('/api/movies', (req,res) => {
    const movies = movie.getAll(); // return all movies in data store
    if (movies) {
        // res.json sets appropriate status code and response header
        res.json(movies);
    } else {
        return res.status(500).send('Database Error occurred');
    }
});

////////////////////////////////////////////// お試し
////////////////////////////////////////////// getItemバージョン。constで定義しているmoviesをmovieにすると、そのあとのgetItemがかかっているmovieがconstの名前のmovieと認識されてしまっているみたい？でうまくいかないので、本来は単数形のはずだけど(getItemなので)、moviesにしました。
app.get('/api/movies/:title', (req,res) => {
    const movies = movie.getItem(req.params.title); // return a single book
    if (movies) {
      // res.json sets appropriate status code and response header
      res.json(movies);
    } else {
      return res.status(500).send('Database Error occurred');
    }
});

app.get('/detail', (req,res) => {
    // db query can use request parameters
    Movies.findOne({ title:req.query.title }).lean()
        .then((movie) => {
            res.render('detail', {result: movie} );
        })
        .catch(err => next(err));
});

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