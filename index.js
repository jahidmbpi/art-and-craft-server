const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
// midleware
app.use(cors());
app.use(express.json());

// artAndCraft
// Jy2506aFenpFckgX

// const uri =
//   "mongodb+srv://<db_username>:<db_password>@cluster0.g8zp6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const uri =
  "mongodb+srv://DB_USER:DB_PASSWORD@cluster0.g8zp6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    // crud oparation..............................start
    const artAndCraftCollection = client
      .db("art&craft_DB")
      .collection("art&craft-item");

    app.post("/arrtAndcraft", async (req, res) => {
      const newArtcraft = req.body;
      const result = await artAndCraftCollection.insertOne(newArtcraft);
      res.send(result);
    });

    app.get("/arrtAndcraft", async (req, res) => {
      const query = artAndCraftCollection.find();
      const result = await query.toArray();
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("craft root server is running");
});

app.listen(port, () => {
  console.log(`crafted root server is runng on port ${port}`);
});
