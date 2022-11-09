const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

//fooduser11
//QlPyjswRfRjExvly

// middle wares
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('food server is running!')
})


const uri = "mongodb+srv://fooduser11:QlPyjswRfRjExvly@cluster0.hjwsdej.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const foodsCollection = client.db("foodsService").collection("foods")
        const reviewCollection = client.db("foodsService").collection("review")
        app.get('/foods', async(req,res)=>{
            const query = {}
            const cursor = foodsCollection.find(query)
            const foods = await cursor.toArray();
            res.send(foods)
        })
        app.get('/foods/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: ObjectId(id) };
          const food = await foodsCollection.findOne(query);
          res.send(food);
      });
      app.post("/review", async (req, res) => {
        const review = req.body;
         await reviewCollection.insertOne(review);
        
        res.status(200).send("review added succesfully");
        // console.log(result);
      });
      app.get("/review", async (req, res) => {
        const query = {}
        const review = await reviewCollection.find(query).toArray();
      res.status(200).send(review);
         
      });
    }
    finally{

    }
}
run()

app.listen(port,()=>{
    client.connect((err) => {
        // Important to check for errors
        if (err) {
          console.log(err);
        } else {
          console.log("Connected to MongoDB");
        }
      });
      
    console.log("Food server running on",port);
})