describe("array", function(){
    it("addBook('The Gift of Small Things',' Arundhuty Roy',6410)", function(){
        assert.deepEqual(addBook("The Gift of Small Things"," Arundhuty Roy",6410),{title: 'The Gift of Small Things', author: ' Arundhuty Roy', libraryID: 6410})
    })
})

describe("array", function(){
    it("getTitles()", function(){
        assert.deepEqual(getTitles(),["Mockingjay: The Final Book of The Hunger Games", "The Gift of Small Things", "The Road Ahead', 'The Road Ahead', 'Walter Isaacson"])
    })
})

describe("array", function(){
    it("findBooks('The')", function(){
        assert.deepEqual(findBooks('The'),[
            {title: 'The Gift of Small Things', author: ' Arundhuty Roy', libraryID: 6410},
            { title: "The Road Ahead", author: "Bill Gates", libraryID: 1235 },
            { title: "The Road Ahead", author: "Bill Gates", libraryID: 4268 },
            { title: "Mockingjay: The Final Book of The Hunger Games", author: "Suzanne Collins", libraryID: 3257 }
           ])
    })
})