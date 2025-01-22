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
public_users.get('/',function (req, res) {
  //Write your code here

  res.send(JSON.stringify({books}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const book = books[req.params.isbn];
  res.send(JSON.stringify({book}, null, 4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let book = null;
    for(const key in books){
        const bk = books[key];
        if(bk.author === req.params.author){
            book = bk;
        }
    }
    res.send(JSON.stringify(book, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let book = null;
    for(const key in books){
        const bk = books[key];
        if(bk.title === req.params.title){
            book = bk;
        }
    }
    res.send(JSON.stringify(book, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const book = books[req.params.isbn];
  res.send(JSON.stringify(book.reviews, null, 4));
});

module.exports.general = public_users;
