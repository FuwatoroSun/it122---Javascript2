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
            res.render('home_react', {movies: JSON.stringify(movies)});
        })
        .catch(err => next(err));
});

////////////////////////////////////////////// added this week
app.get('/api/movies', (req,res) => {
    Movies.find({}).lean()
        .then((movies) => {
        // respond to browser only after db query completes
            // res.render('home', { movies });
            res.send({json: movies});
        })
        .catch(err => next(err));
});

////////////////////////////////////////////// added this week
app.get('/api/movies/:title', (req,res) => {
    Movies.findOne({"title": req.params.title}).lean()
        .then((movies) => {
            // res.render('detail', { result: movies, title: req.params.title });
            res.send({ result: movies, title: req.params.title });
        })
        .catch(err => next(err));
});

////////////////////////////////////////////// added this week
app.get('/api/movies/delete/:title', (req,res) => {
    Movies.remove({"title": req.params.title}).lean()
        .then((movies) => {
            res.send(req.params.title + ' successfully deleted!');
        })
        .catch(err => next(err));
});

////////////////////////////////////////////// added this week
app.post('/api/movies/add', (req,res) => {
    const newmovie = {'title': req.body.title, 'year': req.body.year, 'director': req.body.director, 'genre': req.body.genre};
    Movies.updateOne({"title": req.body.title}, newmovie, {upsert: true}).lean()
        .then((movies) => {
            res.send(req.body.title + ' successfully added!');
        })
        .catch(err => next(err));
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