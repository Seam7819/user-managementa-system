const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


// seam7825
// Hez5QRTVhnd7Boww



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://seam7825:Hez5QRTVhnd7Boww@cluster0.4rme0sq.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const database = client.db("usersDB");
    const userCollections = database.collection("users");

 
    //  Data Read methot 


    app.get('/users' , async (req,res) => {
      const cursor = userCollections.find();
      const result = await cursor.toArray()
      res.send(result)
    })
    
    // Create methdo 

    app.post('/users', async (req,res) => {  
        const user = req.body;
        console.log(user);
        const result = await userCollections.insertOne(user);
        res.send(result)        //acknowlaged true show kore database thik vabe kaj kortce kina
    })


    // Delete method

    app.delete('/users/:id', async (req,res) => {
      const id = req.params.id;
      console.log(id)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// middleware
app.use(express.json())
app.use(cors());

app.get('/' , (req,res)=> {
    res.send('CRUD SERVER IS RUNNIG')
})

app.listen(port, ()=> {
    console.log(`CRUP IS RUNNING ON PORT ${port}`)
})