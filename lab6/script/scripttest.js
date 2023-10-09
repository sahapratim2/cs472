describe("array", function(){
    it("addBook('The Gift of Small Things',' Arundhuty Roy',6410)", function(){
        assert.deepEqual(addBook("The Gift of Small Things"," Arundhuty Roy",6410),{title: 'The Gift of Small Things', author: ' Arundhuty Roy', libraryID: 6410});
    })
})

describe("array", function(){
    it("getTitles()", function(){
        chai.expect(getTitles()).to.include.deep.members(['Mockingjay: The Final Book of The Hunger Games', 'The Road Ahead', 'Walter Isaacson'])
    });
})

describe("array", function(){
    it("findBooks('The')", function(){
            chai.expect(findBooks('The')).to.include.deep.members(
                [
                    { title: "The Road Ahead", author: "Bill Gates", libraryID: 1235 },
                    { title: "The Road Ahead", author: "Bill Gates", libraryID: 4268 },
                    { title: "Mockingjay: The Final Book of The Hunger Games", author: "Suzanne Collins", libraryID: 3257 }
                 ]
            )
    })
})