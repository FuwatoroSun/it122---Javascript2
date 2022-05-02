// GitHubのテキスト見ながら復習したもの。下の方にgetAll, getItem, addItem, deleteItemの日本語解説あり。

// ES6 syntax
const fullName = (title, first, last) => {
    return `${title} ${first} ${last}`
}

console.log(fullName("Conan", "Gosho", "Aoyama"));

function func() {
    if (true) {
        var tmp = 123;
    }
    console.log(tmp); // prints 123
}

func();

const printWanko = () => {
    console.log("にんじゃわんこ");
};

// 関数callにcallbackという名前の引数を追加してください
const call = (callback) => {
console.log("コールバック関数を呼び出します。");
    // 引数に渡したcallbackを呼び出してください
    callback();
};

// 関数printWankoを引数に渡して関数callを実行してください
call(printWanko);


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


let movies = [
    {title: "2001: A Space Odyssey", year: "1968", director: "Stanley Kubrick", genre: "Science Fiction"},
    {title: "Stand by Me", year: "1986", director: "Rob Reiner", genre: "Coming-of-age Story"},
    {title: "Titanic", year: "1997", director: "James Cameron", genre: "Romance"},
    {title: "Harry Potter and the Sorcerer's Stone", year: "2001", director: "Chris Columbus", genre: "Fantasy"},
    {title: "La La Land", year: "2016", director: "Damien Chazelle", genre: "Musical"}
];

const getAll = () => {
    return movies;
};

// for(var i=0; i<movies.length; i++){
//     console.log(movies[i]);
// }

// console.log(getAll());

const getItem = function(title) {
    return movies.find((movie) => {
        return movie.title === title;
    });
};

// console.log(getItem("Titanic"));

const addItem = (newmovie) => { // newmovieを引数として受け取る
    const oldLength = movies.length; // oldLengthでmoviesの値の個数を受け取る
    let found = getItem(newmovie.title); // foundを定義（newmovieのtitleを引数としてgetItemを読み込む（ここで、newmovieは新しい値なので本来は見つからないはず））
    if (!found) { // もしfoundが見つからなかったら（これが正常）
        movies.push(newmovie); // pushは配列の末尾(後ろ)に新しい要素を追加するためのメソッド。newmovieをmoviesに追加しますよ。
    }
    return {added: oldLength !== movies.length, title: newmovie, total: movies.length };
    // oldLengthと追加後のmoviesの配列の個数が一致していなかったらtrue。追加されたってことになる。titleは追加されたものの名前、totalは新しいmoviesの配列の個数。
};

console.log("元のmoviesの個数: ",movies.length);

const newmovie = {title: "Totoro", year: "2006", director: "Hayao Miyazaki", genre: "Anime"};
// addItem(newmovie);

console.log(addItem(newmovie)); // console.logの中にaddItemを入れてもちゃんとaddされる
console.log("addItem後のmovies");
console.log(movies);
// 一度addItemをした後でも、該当コードをコメントアウトするとやってないことになる。元データが書き変わるわけじゃなさそう？

const deleteItem = function(title) {
    const oldLength = movies.length; // oldLengthでmoviesの値の個数を受け取る
    movies = movies.filter((item) => { // moviesを定義（moviesの中からその後のアロー関数で合致したものだけ取り出す）
        return item.title !== title;
        // アロー関数の中身。itemを引数として定義、itemのtitleがdeleteItemで引数として受け取っているtitleと同じじゃなかったらfilterに引っかかるようにする。
        // ここでいう引数は、filterがかかっている配列の1つを指すので、名前(item)は何でもいい。
        // 配列のうちの1つの、さらにそのtitleが、deleteItemで引数として受け取っているtitleと同じでないやつをfilterでピックアップ。
        // ピックアップしたものを新たにmoviesとして配列に格納する。
        // つまり、指定した名前のやつだけ配列から取り除くのではなく、新しい配列に入れない、という考え方。
    });
    return {deleted: oldLength !== movies.length, total: movies.length };
}

console.log(deleteItem("Totoro"));
console.log("deleteItem後のmovies");
console.log(movies);
// TypeError: Assignment to constant variable.とエラーが最初でた。これは、moviesをはじめconstで定義していたのに、deleteItemでmoviesを更新しようとしたから。constは上書きできない。