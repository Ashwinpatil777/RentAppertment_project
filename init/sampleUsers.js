const mongoose = require('mongoose');
const User = require('../models/user');

mongoose.connect('mongodb://127.0.0.1:27017/rentapartment')
    .then(() => console.log('Connected to MongoDB for seeding users'))
    .catch(err => console.error('MongoDB connection error:', err));

const sampleUsers = [
    {
        username: "rajesh_kumar",
        email: "rajesh.kumar@email.com",
        isAdmin: false
    },
    {
        username: "priya_sharma",
        email: "priya.sharma@email.com",
        isAdmin: false
    },
    {
        username: "amit_patel",
        email: "amit.patel@email.com",
        isAdmin: false
    },
    {
        username: "neha_gupta",
        email: "neha.gupta@email.com",
        isAdmin: false
    },
    {
        username: "suresh_verma",
        email: "suresh.verma@email.com",
        isAdmin: false
    },
    {
        username: "anita_singh",
        email: "anita.singh@email.com",
        isAdmin: false
    },
    {
        username: "vikram_shah",
        email: "vikram.shah@email.com",
        isAdmin: false
    },
    {
        username: "meera_desai",
        email: "meera.desai@email.com",
        isAdmin: false
    },
    {
        username: "rahul_mehta",
        email: "rahul.mehta@email.com",
        isAdmin: false
    },
    {
        username: "pooja_joshi",
        email: "pooja.joshi@email.com",
        isAdmin: false
    }
];

const seedUsers = async () => {
    try {
        // Clear existing users except admin
        await User.deleteMany({ isAdmin: false });
        console.log('Cleared existing non-admin users');

        // Create users with password "password123"
        for (const userData of sampleUsers) {
            const user = new User(userData);
            await User.register(user, 'password123');
            console.log(`Created user: ${userData.username}`);
        }

        console.log('Sample users seeded successfully!');
    } catch (err) {
        console.error('Error seeding users:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedUsers(); 