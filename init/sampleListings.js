const mongoose = require('mongoose');
const Listing = require('../models/listing');
const User = require('../models/user');

mongoose.connect('mongodb://127.0.0.1:27017/rentapartment')
    .then(() => console.log('Connected to MongoDB for seeding data'))
    .catch(err => console.error('MongoDB connection error:', err));

const sampleListings = [
    {
        title: "Modern 2BHK with Full Amenities",
        description: `Luxurious 2BHK apartment with modern amenities:
- Fully furnished with premium furniture
- 24/7 water supply
- Professional cleaning service by owner
- Power backup
- Modular kitchen with built-in appliances
- 2 spacious bedrooms with attached bathrooms
- Large balcony with city view
- Parking space included`,
        image: {
            filename: "2bhk-modern",
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop"
        },
        price: 35000,
        location: "Andheri West, Mumbai",
        contactNumber: "9876543210",
        additionalDetails: "3 months deposit required (₹105,000)"
    },
    {
        title: "Spacious 2BHK Near Metro Station",
        description: `Well-maintained 2BHK apartment in prime location:
- Semi-furnished with essential furniture
- 24/7 water and electricity backup
- Weekly cleaning included
- Security system with CCTV
- Modern fittings and fixtures
- Walking distance to metro station
- Shopping complex nearby
- Reserved parking`,
        image: {
            filename: "2bhk-metro",
            url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop"
        },
        price: 28000,
        location: "Goregaon East, Mumbai",
        contactNumber: "9876543211",
        additionalDetails: "2 months deposit required (₹56,000)"
    },
    {
        title: "Sea View 2BHK with Premium Amenities",
        description: `Premium 2BHK apartment with stunning sea views:
- Fully furnished with high-end furniture
- 24/7 water supply with purifier
- Daily cleaning service
- High-speed internet ready
- Modern gym and swimming pool
- Club house access
- Premium security with intercom
- Covered parking`,
        image: {
            filename: "2bhk-sea-view",
            url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop"
        },
        price: 45000,
        location: "Bandra West, Mumbai",
        contactNumber: "9876543212",
        additionalDetails: "6 months deposit required (₹270,000)"
    },
    {
        title: "Cozy 1BHK in Residential Complex",
        description: `Perfect 1BHK for singles or couples:
- Semi-furnished with quality furniture
- 24/7 water supply
- Security guard
- Well-maintained building
- Close to market area
- Good transport connectivity
- Peaceful neighborhood
- Two-wheeler parking`,
        image: {
            filename: "1bhk-cozy",
            url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop"
        },
        price: 18000,
        location: "Malad West, Mumbai",
        contactNumber: "9876543213",
        additionalDetails: "2 months deposit required (₹36,000)"
    },
    {
        title: "Luxury 3BHK Penthouse",
        description: `Exclusive penthouse with premium features:
- Fully furnished with imported furniture
- Private terrace garden
- 24/7 power backup
- Premium society amenities
- 3 covered parking spots
- High-end security system
- Servant quarters
- Private elevator access`,
        image: {
            filename: "3bhk-penthouse",
            url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop"
        },
        price: 85000,
        location: "Powai, Mumbai",
        contactNumber: "9876543214",
        additionalDetails: "6 months deposit required (₹510,000)"
    },
    {
        title: "Budget 1BHK Near Station",
        description: `Affordable 1BHK with basic amenities:
- Unfurnished
- 24/7 water supply
- Close to railway station
- Local market nearby
- Basic amenities
- Natural ventilation
- Ground floor
- Bike parking`,
        image: {
            filename: "1bhk-budget",
            url: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&auto=format&fit=crop"
        },
        price: 15000,
        location: "Kandivali East, Mumbai",
        contactNumber: "9876543215",
        additionalDetails: "1 month deposit required (₹15,000)"
    },
    {
        title: "Modern Studio Apartment",
        description: `Compact studio apartment for professionals:
- Fully furnished
- Modern design
- Built-in wardrobes
- Kitchenette
- High-speed internet
- 24/7 security
- Gym access
- Rooftop garden`,
        image: {
            filename: "studio-modern",
            url: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?w=800&auto=format&fit=crop"
        },
        price: 25000,
        location: "Lower Parel, Mumbai",
        contactNumber: "9876543216",
        additionalDetails: "3 months deposit required (₹75,000)"
    },
    {
        title: "Family 3BHK with Garden View",
        description: `Spacious 3BHK perfect for families:
- Semi-furnished
- Large living room
- Modern kitchen
- Children's play area
- Garden view
- 24/7 security
- Community hall access
- 2 parking spots`,
        image: {
            filename: "3bhk-family",
            url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop"
        },
        price: 55000,
        location: "Juhu, Mumbai",
        contactNumber: "9876543217",
        additionalDetails: "4 months deposit required (₹220,000)"
    },
    {
        title: "Bachelor's 2BHK Near IT Park",
        description: `Ideal 2BHK for working professionals:
- Fully furnished
- Modern amenities
- Work from home setup
- High-speed internet
- Gym membership
- Close to IT park
- Good connectivity
- Covered parking`,
        image: {
            filename: "2bhk-bachelor",
            url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&auto=format&fit=crop"
        },
        price: 32000,
        location: "Thane West, Mumbai",
        contactNumber: "9876543218",
        additionalDetails: "2 months deposit required (₹64,000)"
    },
    {
        title: "Premium 4BHK Duplex",
        description: `Luxurious duplex apartment with premium features:
- Fully furnished with designer furniture
- Double-height living room
- Modular kitchen with appliances
- Private terrace
- Swimming pool access
- Premium clubhouse
- 3 parking spots
- Servant room`,
        image: {
            filename: "4bhk-duplex",
            url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop"
        },
        price: 120000,
        location: "Worli, Mumbai",
        contactNumber: "9876543219",
        additionalDetails: "6 months deposit required (₹720,000)"
    }
];

const seedDB = async () => {
    try {
        // Clear existing listings
        await Listing.deleteMany({});
        console.log('Cleared existing listings');

        // Get all non-admin users
        const users = await User.find({ isAdmin: false });
        if (users.length === 0) {
            console.log('No users found. Please run sampleUsers.js first.');
            return;
        }

        // Assign random users to listings
        const listingsWithOwners = sampleListings.map(listing => {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            return { ...listing, owner: randomUser._id };
        });

        // Insert new listings
        const insertedListings = await Listing.insertMany(listingsWithOwners);
        console.log('Added sample listings:', insertedListings.length);

        console.log('Sample data seeded successfully!');
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB(); 