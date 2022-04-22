const movies = [
    {title: "2001: A Space Odyssey", year: "1968", director: "Stanley Kubrick", genre: "Science Fiction"},
    {title: "Stand by Me", year: "1986", director: "Rob Reiner", genre: "Coming-of-age Story"},
    {title: "Titanic", year: "1997", director: "James Cameron", genre: "Romance"},
    {title: "Harry Potter and the Sorcerer's Stone", year: "2001", director: "Chris Columbus", genre: "Fantasy"},
    {title: "La La Land", year: "2016", director: "Damien Chazelle", genre: "Musical"}
];

// const jsonmovies = JSON.stringify(movies);

const getAll = function() {
    return movies;
}

const getItem = function(title) {
    return movies.find((movie) => {
        return movie.title === title;
    });
}

console.log(getAll());
console.log(getItem("Titanic"));

export {getAll, getItem};