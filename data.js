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

const addItem = (newmovie) => {
    const oldLength = movies.length;
    let found = getItem(newmovie.title);
    if (!found) {
        movies.push(newmovie);
    }
    return {added: oldLength !== movies.length, title: newmovie, total: movies.length };
};

const deleteItem = function(title) {
    // retain array length for later comparison after array modification
    const oldLength = movies.length;
    let movies = movies.filter((item) => {
        return item.title !== title;
    });
    // if old & new array lengths differ, item was deleted
    return {deleted: oldLength !== movies.length, total: movies.length };
}

// console.log(deleteItem("Totoro"));
// console.log(getItem("Titanic"));

export {getAll, getItem};