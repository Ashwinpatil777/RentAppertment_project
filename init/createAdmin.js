const mongoose = require('mongoose');
const User = require('../models/user');

const MONGODB_URL = "mongodb://127.0.0.1:27017/rentapartment";

const createOrUpdateAdmin = async (customPassword = "admin123") => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Connected to MongoDB...");

        // Check if admin already exists
        const existingAdmin = await User.findOne({ username: "admin" });
        
        if (existingAdmin) {
            console.log("Admin user exists, updating password...");
            // Set new password
            await existingAdmin.setPassword(customPassword);
            await existingAdmin.save();
           
        } else {
            // Create new admin user
            const adminUser = new User({
                username: "admin",
                email: "admin@rentapartment.com",
                isAdmin: true
            });

            // Register admin user with passport-local-mongoose
            await User.register(adminUser, customPassword);
           
        }
        
       
    } catch (err) {
       
        console.error("Full error:", err);
    } finally {
        await mongoose.connection.close();
       
    }
};

// Add command line argument support for custom password
const args = process.argv.slice(2);
if (args.length > 0) {
    const customPassword = args[0];
   
    createOrUpdateAdmin(customPassword);
} else {
   
    createOrUpdateAdmin();
}


//console.log("node createAdmin.js Admin@123#Secure"); 