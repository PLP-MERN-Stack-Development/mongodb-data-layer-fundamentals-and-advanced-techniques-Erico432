// queries.js
// Run: node queries.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // replace with Atlas URI if needed
const dbName = 'plp_bookstore';
const colName = 'books';

async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const col = db.collection(colName);

  // 1) Find all books
  console.log("1) All books (limit 10):");
  let all = await col.find().limit(10).toArray();
  console.log(JSON.stringify(all, null, 2));

  // 2) Find books in a specific genre (example: 'Fiction')
  console.log("\n2) Books in genre='Fiction':");
  let fiction = await col.find({ genre: "Fiction" }).toArray();
  console.log(JSON.stringify(fiction, null, 2));

  // 3) Find books published after a certain year (example: 2000)
  console.log("\n3) Books published after 2000:");
  let recent = await col.find({ published_year: { $gt: 2000 } }).toArray();
  console.log(JSON.stringify(recent, null, 2));

  // 4) Find in-stock books
  console.log("\n4) In-stock books:");
  let instock = await col.find({ in_stock: true }).toArray();
  console.log(JSON.stringify(instock, null, 2));

  // 5) Top 5 most expensive books
  console.log("\n5) Top 5 most expensive books:");
  let topExpensive = await col.find().sort({ price: -1 }).limit(5).toArray();
  console.log(JSON.stringify(topExpensive, null, 2));

  // 6) Aggregation: count & avg price per genre
  console.log("\n6) Aggregation - count and avg price per genre:");
  let aggGenre = await col.aggregate([
    { $group: { _id: "$genre", count: { $sum: 1 }, avgPrice: { $avg: "$price" } } },
    { $sort: { count: -1 } }
  ]).toArray();
  console.log(JSON.stringify(aggGenre, null, 2));

  // 7) Aggregation: publisher with most books
  console.log("\n7) Publisher with most books:");
  let topPublisher = await col.aggregate([
    { $group: { _id: "$publisher", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
  ]).toArray();
  console.log(JSON.stringify(topPublisher, null, 2));

  // 8) Create an index for performance (e.g., genre and published_year)
  console.log("\n8) Creating index on { genre: 1, published_year: -1 }");
  const indexName = await col.createIndex({ genre: 1, published_year: -1 });
  console.log("Index created:", indexName);

  // 9) Example update: mark a book out of stock
  console.log("\n9) Update example: set in_stock=false for a book title 'Old Title' (if exists)");
  await col.updateOne({ title: "Old Title" }, { $set: { in_stock: false } });

  // 10) Example delete: delete a placeholder book
  console.log("\n10) Delete example: remove book with title 'REMOVE_ME' (if exists)");
  await col.deleteOne({ title: "REMOVE_ME" });

  await client.close();
  console.log("\nAll queries completed.");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
