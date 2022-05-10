import { Movies } from "../Movies.js";

// return all records
Movies.find({}).lean()
  .then((movies) => {
    console.log(movies);
  })
  .catch(err => next(err));

// return all records that match a condition
Movies.find({"year": "1986"}).lean()
  .then((movies) => {
    console.log(movies);
  })
  .catch(err => next(err));

// return a single record
Movies.findOne({"year": "1986"}).lean()
  .then((movies) => {
      console.log(movies);;
  })
  .catch(err => next(err));

// // insert or update a single record
const newMovie = {"title": "La La Land", "year": "2016", "director": "Damien Chazelle", "genre": "Musical"}
Movies.updateOne({'title':'Stand by Me'}, newMovie, {upsert:true}, (err, result) => {
  if (err) return next(err);
  console.log(result);
  // other code here
});