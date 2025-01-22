const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if(username && password){
    if(!isValid(username)){
        return res.status(404).json({ message: "User already exists!" });
    }
    else{
        users.push({ "username": username, "password": password });
        return res.status(200).json({ message: "User successfully registered. Now you can login" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    // Create a Promise to simulate asynchronous data fetching
    const fetchBooks = new Promise((resolve, reject) => {
        // Simulating an asynchronous operation with setTimeout
        setTimeout(() => {
            if (books) {
                resolve(books); // Resolve with the books data
            } else {
                reject("No books available"); // Reject in case of an error
            }
        }, 1000); // Simulate 1-second delay
    });

    // Handle the Promise
    fetchBooks
        .then(data => {
            res.send(JSON.stringify({ books: data }, null, 4));
        })
        .catch(error => {
            res.status(500).send("Error fetching books: " + error);
        });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    // Create a Promise to simulate fetching the book by ISBN
    const fetchBookByISBN = new Promise((resolve, reject) => {
        // Simulate an asynchronous operation with setTimeout
        setTimeout(() => {
            const book = books[isbn]; // Retrieve the book by ISBN
            if (book) {
                resolve(book); // Resolve with the book data if found
            } else {
                reject("Book not found"); // Reject if the ISBN is not found
            }
        }, 1000); // Simulate 1-second delay
    });

    // Handle the Promise
    fetchBookByISBN
        .then(data => {
            res.send(JSON.stringify({ book: data }, null, 4)); // Send the book data
        })
        .catch(error => {
            res.status(404).send("Error: " + error); // Send an error if the book is not found
        });
});
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;

    // Create a Promise to simulate fetching the book by author
    const fetchBookByAuthor = new Promise((resolve, reject) => {
        // Simulate an asynchronous operation with setTimeout
        setTimeout(() => {
            let book = null;
            for (const key in books) {
                const bk = books[key];
                if (bk.author === author) {
                    book = bk; // Find the book by author
                    break; // Exit loop after finding the book
                }
            }
            if (book) {
                resolve(book); // Resolve with the book data if found
            } else {
                reject("Book not found for the given author"); // Reject if no book is found
            }
        }, 1000); // Simulate 1-second delay
    });

    // Handle the Promise
    fetchBookByAuthor
        .then(data => {
            res.send(JSON.stringify(data, null, 4)); // Send the book data
        })
        .catch(error => {
            res.status(404).send("Error: " + error); // Send an error if the book is not found
        });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    
    const title = req.params.title;
    const fetchBookByTitle = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            let book = null;
            for(const key in books){
                const bk = books[key];
                if(bk.title === title){
                    book = bk;
                }
            }
            if(book){
                resolve(book);
            }
            else{
                reject("Book not found for the given author"); // Reject if no book is found
            }
        },1000);
    });
    fetchBookByTitle.then(data => {
        res.send(JSON.stringify(data, null, 4));
    }).catch(error => {
        res.status(404).send("Error: " + error); // Send an error if the book is not found
    });
    
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const book = books[req.params.isbn];
  res.send(JSON.stringify(book.reviews, null, 4));
});

module.exports.general = public_users;
