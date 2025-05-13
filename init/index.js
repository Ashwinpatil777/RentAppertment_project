const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/rentapartment";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
})

async function main(){
  await mongoose.connect(MONGO_URL);
}


const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();



//gpt
const { MongoMemoryServer } = require("mongodb-memory-server");

async function startDB() {
    // Create an instance of MongoMemoryServer
    const mongod = await MongoMemoryServer.create();

    // Get the URI of the in-memory database
    const uri = mongod.getUri();
    console.log("MongoMemoryServer URI:", uri);  // This is important, copy this URI for Compass

    console.log("Connected to in-memory database");

    // Add your other database logic here, such as models and seeding data
}

// Call the function to start the database connection
startDB().catch(err => console.error(err));