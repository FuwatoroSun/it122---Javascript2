// 授業内で使用したもの

import { expect } from "chai";

// let result = {title: "Dune", author: "frank herbert", pubdate: 1969};

const getItem = (item) => {
    return {title: "Dune", author: "frank herbert", pubdate: 1969};
};

describe('test deep equality', () => {
    it('1 equals to 1', () => {
        expect(1).to.equal(1);
    });
    it('2 equals to 1', () => {
        expect(2).to.equal(1);
    });
    /*
    it('JSON objects should be equal', () => {
        expect(result).to.deep.equal(
            {title: "Dune", author: "frank herbert", pubdate: 1969}
        );
    });
    */
    it('getItem returns correct book', () => {
        let result = getItem("dune");
        expect(result).to.deep.equal(
            {title: "Dune", author: "frank herbert", pubdate: 1969}
        );
    });
    it('getItem fails with incorrect book', () => {
        let result = getItem("Harry Potter");
        expect(result).to.be.undefined;
    });
});

/*
describe("Book module", () => {
 it("returns requested book", function() {
   var result = book.get("dune");
   expect(result).to.deep.equal({title: "dune", author:"frank herbert", pubdate:1969});
 });

 it("fails w/ invalid book", () => {
   var result = book.get("fake");
   expect(result).to.be.undefined;
 });
});
*/
