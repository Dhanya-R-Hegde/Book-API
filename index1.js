const express = require("express");

//Database
const database = require("./database");

// Initialise express
const booky = express();

//API to get all books
/*
Route        /
Description  Get all books
Access       Public
Parameter    None
Methods      Get
*/
booky.get("/", (req,res) => {
  return res.json({books: database.books});
});

//API to get a specific book based on id --> localhost:3000/12345Book
/*
Route        /is
Description  Get Specific book
Access       Public
Parameter    isbn
Methods      Get
*/
booky.get("/is/:isbn", (req,res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if(getSpecificBook.length === 0){
    return res.json({
      error: `No book found for ISBN of ${req.params.isbn}`
    });
  }
  return res.json({book: getSpecificBook});
});

//API to get books on a specific category
/*
Route        /c
Description  Get Specific book
Access       Public
Parameter    category
Methods      Get
*/
booky.get("/c/:category", (req,res)=> {
  const getSpecificBook = database.books.filter((book) =>
  book.category.includes(req.params.category)
);
  if(getSpecificBook.length === 0){
  return res.json({
    error: `No book found for category of ${req.params.category}`
  });
}
return res.json({book: getSpecificBook});
});

//API to get all authors
/*
Route        /author
Description  Get all authors
Access       Public
Parameter    none
Methods      Get
*/
booky.get("/author", (req,res) => {
  return res.json({authors: database.author});
});

//API to get all authors based on a perticular book
/*
Route        /author/book
Description  Get all authors based on book
Access       Public
Parameter    isbn
Methods      Get
*/

booky.get("/author/book/:isbn", (req,res)=> {
  const getSpecificAuthor = database.author.filter((author) =>
  author.books.includes(req.params.isbn)
);
  if(getSpecificAuthor.length === 0){
  return res.json({
    error: `No author found for isbn of ${req.params.isbn}`
  });
}
return res.json({authors: getSpecificAuthor});
});

//API to get all publications
/*
Route        /publications
Description  Get all publications
Access       Public
Parameter    none
Methods      Get
*/

booky.get("/publications", (req,res) => {
  return res.json({publications: database.publication});
});


booky.listen(3000,() => console.log("Server is up and running"));

/*cmd commands:cd Desktop\bookapi,
               npm init-to initialise npm,
               npm i express-to install express,
               node index-for running*/

/*nodemon installation and running cmd
C:\Users\DHANYA R HEGDE\Desktop\bookapi>npm i nodemon

added 116 packages, and audited 167 packages in 29s

15 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
npm notice
npm notice New minor version of npm available! 8.1.2 -> 8.3.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v8.3.0
npm notice Run npm install -g npm@8.3.0 to update!
npm notice

C:\Users\DHANYA R HEGDE\Desktop\bookapi>npx nodemon index
[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index index.js`
Server is up and running
const express = require("express");*/
