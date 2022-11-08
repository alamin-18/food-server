const { MongoClient, ServerApiVersion } = require('mongodb');
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
        app.get('/foods', async(req,res)=>{
            const query = {}
            const cursor = foodsCollection.find(query)
            const foods = await cursor.toArray();
            res.send(foods)

        })
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