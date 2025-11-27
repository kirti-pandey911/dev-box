const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require('express-rate-limit');


const app = express();
console.log("app", app)
app.use(express.json());

// connect to MongoDB
// mongoose.connect("mongodb://mongo:27017/dev-box", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const ItemSchema = new mongoose.Schema({ name: String });
// const Item = mongoose.model("Item", ItemSchema);


// app.post("/items", async (req, res) => {
//   const item = new Item({ name: req.body.name });
//   await item.save();
//   res.send(item);
// });

// app.get("/items", async (req, res) => {
//   const items = await Item.find();
//   res.send(items);
// });
const limiter = rateLimit({
    windowMs: 1 * 60* 1000,
    max: 5,
    message: "Too many requests from this IP, please try again after 15 minutes"
})
// Apply the rate limiter to all requests
app.use(limiter);

app.get("/", (req, res) => {
 return res.send('HELLO WORLD!');
});

app.listen(8080, () => console.log("Server running on port 8080"));
