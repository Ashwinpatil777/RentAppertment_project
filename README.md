# RentAppertment_project

🏠 RentApartment Project
A Full-Stack Rental Apartment Listing Platform built with the MERN stack (MongoDB, Express.js, React, Node.js) using EJS as the templating engine.

🔑 Key Features
🔐 Authentication & Security
User authentication with Passport.js (Local Strategy)

bcrypt for secure password hashing

Session management using express-session

HTTP-only cookies for enhanced protection

Route protection and flash messaging

🏘️ Apartment Listings (CRUD)
Users can Create, Read, Update, Delete apartment listings

Image uploads handled via Multer

Image previews in listings

📩 Contact & Feedback
Functional contact form

Flash messages for success/error notifications

🛠️ Tech Stack
Layer	Technology
Backend	Node.js, Express.js
Frontend	EJS with EJS-Mate
Database	MongoDB + Mongoose
Auth	Passport.js
File Upload	Multer

📁 Project Structure
csharp
Copy code
RentApartment/
├── models/          # Mongoose schemas (User, Apartment)
├── routes/          # Route definitions
├── views/           # EJS templates
├── public/          # Static files (CSS, images)
├── middleware/      # Custom middleware (auth, error)
├── uploads/         # Uploaded images
├── app.js           # Entry point
└── package.json     # Dependencies

🧩 Key Dependencies
express – Backend framework

mongoose – ODM for MongoDB

passport – User authentication

multer – File upload

ejs – Templating engine

express-session – Session management

bcrypt – Password hashing

✅ Best Practices Followed
MVC-style modular code

Middleware usage for cleaner routes

Strong error handling with custom messages

Security: encrypted passwords, session protection, protected routes

Clean UX with flash messages and responsive design

📸 UI Screenshots
![image](https://github.com/user-attachments/assets/795e9b64-4e05-46db-a7ad-74d566fb0326)
![image](https://github.com/user-attachments/assets/9c944185-23b1-4036-984f-a61f613183cc)
![image](https://github.com/user-attachments/assets/48efe13f-52bc-4ee0-9fd5-95496442e8b7)
![image](https://github.com/user-attachments/assets/ff29784c-6711-4ad6-9d7f-0936816e49a8)
![image](https://github.com/user-attachments/assets/d21789f2-4a42-40b1-a18f-28bd2c0e6435)
![image](https://github.com/user-attachments/assets/392a7dc7-729a-45e5-9975-6803f9a72083)
![image](https://github.com/user-attachments/assets/67b93942-7402-404a-9170-0d8a43fa56bc)






