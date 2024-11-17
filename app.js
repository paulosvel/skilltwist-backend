const express = require('express');
const sequelize = require('./config/db'); // Import the sequelize instance
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Use the authentication routes
app.use('/api/auth', authRoutes);

// Sync the database and start the server
const startServer = async () => {
    try {
        await sequelize.sync(); // Sync models with the database
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Unable to start the server:', error);
    }
};

startServer(); 