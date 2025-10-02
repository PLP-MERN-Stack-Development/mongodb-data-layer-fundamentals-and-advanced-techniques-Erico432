# 📚 PLP Bookstore MongoDB Project

This project demonstrates how to use **MongoDB with Node.js** for basic CRUD operations, advanced queries, indexing, and aggregation.  

It contains two main scripts:

- **insert_books.js** → Populates MongoDB with sample book data  
- **queries.js** → Runs CRUD operations, queries, updates, deletes, and aggregations  

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) installed  
- [MongoDB](https://www.mongodb.com/) running locally (or MongoDB Atlas)  
- Install MongoDB Node.js driver:  
  ```bash
  npm install mongodb

⚙️ Setup

    Clone or download this project

    Start MongoDB locally:

    mongod

    (Default connection is mongodb://localhost:27017)

    Open a terminal inside the project folder

▶️ Usage
1. Insert Sample Books

Run:

node insert_books.js

This script will:

    Connect to database plp_bookstore

    Drop the books collection if it already exists

    Insert sample book data

    Print inserted books in the console

2. Run Queries

After inserting books, run:

node queries.js

This script demonstrates:

    Find all books (limit 10)

    Find books in a specific genre (e.g. Fiction)

    Find books published after a certain year (e.g. 2000)

    Find in-stock books

    Top 5 most expensive books

    Aggregation → count & average price per genre

    Aggregation → publisher with most books

    Create an index ({ genre: 1, published_year: -1 })

    Example update (in_stock=false for a book)

    Example delete (remove a book by title)

🖥️ Example Queries in Mongo Shell

After inserting data, you can use mongosh:

mongosh
use plp_bookstore
db.books.find().pretty()

Sample queries:

db.books.find({ author: "George Orwell" })
db.books.find({ published_year: { $gt: 1950 } })
db.books.find({ genre: "Fiction" })
db.books.find({ in_stock: true })

📝 Notes

    Default MongoDB URI is:

    mongodb://localhost:27017

    To use MongoDB Atlas, replace the URI in both scripts with your Atlas connection string.

    Both scripts use async/await for clean and modern MongoDB operations.

📌 Project Flow

    Insert sample data → insert_books.js

    Explore CRUD and aggregations → queries.js

    Inspect results in MongoDB Compass or mongosh