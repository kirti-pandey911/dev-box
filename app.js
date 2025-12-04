import express from "express";
import mongoose from "mongoose";
import rateLimit from 'express-rate-limit';
import { createClient } from 'redis';
const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
let redisClientRespone = await client.connect();
console.log("Redis Client connected:", redisClientRespone);

const app = express();
app.use(express.json());

// Redis work
// await client.hSet('sample_session:556677889', {
//     name: 'ava_martin',
//     email: 'ava@example.com',
//     user_id: 556
// })
// let userSession = await client.hGetAll('user-session:123');
// console.log(JSON.stringify(userSession, null, 2));
// console.log("Redis Client Response:", clientRes);

// End Redis

app.get('/products/:skip/:limit', async(req,res) => {
    console.log("Fetching products...");
    const { skip, limit } = req.params;
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    const data = await response.json();
    await client.set(`prouducts_${skip}_limit${limit}`, JSON.stringify(data.products));
    return res.json({
      requested: { skip, limit },
      products: data.products,
    });
})
app.get('/search', async(req,res) => {
   const res1 = await client.rPop('bikes:repairs');
console.log(res1);
res.send({"response":res1})
    // res.send({"response":res1})   
})

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
// const limiter = rateLimit({
//     windowMs: 1 * 60* 1000,
//     max: 5,
//     message: "Too many requests from this IP, please try again after 15 minutes"
// })
// // Apply the rate limiter to all requests
// app.use(limiter);

app.get("/", (req, res) => {
 return res.send('HELLO WORLD!');
});

app.listen(5000, () => console.log("Server running on port 5000"));
