import { expect } from "chai";
import {getItem, addItem, deleteItem} from "../data.js";

describe('test deep equality', () => {

    // getItem
    it('getItem returns correct movie', () => {
        let result = getItem("Titanic");
        expect(result).to.deep.equal(
            {title: "Titanic", year: "1997", director: "James Cameron", genre: "Romance"}
        );
    });
    it('getItem fails with incorrect movie', () => {
        let result = getItem("Titamic");
        expect(result).to.be.undefined;
    });
    
    // addItem
    it('addItem adds a new movie', () => {
        let newmovie  = {title: "Totoro", year: "1997", director: "James Cameron", genre: "Romance"};
        let result = addItem(newmovie);
        expect(result).to.deep.equal(
            {added: true, title: "Totoro", total: 6 }
        );
    });
    it('addItem fails with incorrect movie', () => {
        let result = addItem("Totoro");
        expect(result.added).to.be.false;
    });
    
    // deleteItem
    it('deleteItem returns correct movie', () => {
        let result = deleteItem("Titanic");
        expect(result).to.deep.equal(
            {deleted: true, total: 5 }
        );
    });
    it('deleteItem fails with incorrect movie', () => {
        let result = deleteItem("Titanic");
        expect(result.deleted).to.be.false;
    });
});

//////////////////////////////////////////////
// terminal                                 //
// C:\MAMP\htdocs\it122---Javascript2\test> //
// npx mocha test_script.js                 //
//////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////
// 聞くこと                                                                     //
// addItem fails with incorrect movieとdeleteItem fails with incorrect movieの  //
// テストがパスにならない。どうなればいいのかが分からない。                         //
/////////////////////////////////////////////////////////////////////////////////