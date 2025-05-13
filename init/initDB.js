const mongoose = require('mongoose');
const Listing = require('../models/listing');
const sampleListings = require('./sampleData');

// MongoDB connection URL
const MONGODB_URL = "mongodb://127.0.0.1:27017/wanderlust";

const initDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URL);
        console.log("Connected to MongoDB...");

        
        const result = await Listing.insertMany(sampleListings);
        console.log(`✅ Successfully added ${result.length} listings!`);
        console.log("Sample data initialized successfully!");

    } catch (err) {
        console.error("Error while initializing database:", err);
    } finally {
        
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
    }
};

// Run the initialization
initDB().then(() => {
    console.log("Initialization completed!");
}); 