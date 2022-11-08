const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

//fooduser11
//QlPyjswRfRjExvly

app.get('/',(req,res)=>{
    res.send('food server is running!')
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://fooduser11:QlPyjswRfRjExvly@cluster0.hjwsdej.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


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