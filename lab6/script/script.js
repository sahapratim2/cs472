
console.log("---------------------------Answer 1--------------------------");
let libraryBooks = [
  { title: "The Road Ahead", author: "Bill Gates", libraryID: 1235 },
  { title: "Walter Isaacson", author: "Steve Jobs", libraryID: 4268 },
  { title: "The Road Ahead", author: "Bill Gates", libraryID: 4268 },
  { title: "Mockingjay: The Final Book of The Hunger Games", author: "Suzanne Collins", libraryID: 3257 }
];
function addBook(title, author, libraryID) {
  let book = { title: title, author: author, libraryID: libraryID };
  libraryBooks.push(book);
  return book;
}

let book = addBook("The Gift of Small Things", " Arundhuty Roy", 6410);
console.log("Book : ");
console.log(book);
console.log("Library Books : ");
console.log(libraryBooks);

console.log("---------------------------Answer 2--------------------------");

function getTitle(obj) {
  return obj.title;
}

function getTitles() {
  return libraryBooks.map(getTitle).sort();
}

console.log("getTitles() : ");
console.log(getTitles());

console.log("---------------------------Answer 3--------------------------");

function findBooks(title) {
  return libraryBooks.filter(x => x.title.toUpperCase().includes(title.toUpperCase())).sort((a, b) => {
    const authorA = a.author.toUpperCase();
    const authorB = b.author.toUpperCase();
    if (authorA < authorB) {
      return -1;
    }
    if (authorA > authorB) {
      return 1;
    }
    return 0;
  });
}

console.log("findBooks('The') : ");
console.log(findBooks('The'));

