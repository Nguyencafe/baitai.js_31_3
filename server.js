const express = require('express');
const mongoose = require('mongoose');
const menuRoutes = require('./routes/menu');

const app = express();
const PORT = 3000;

// Middleware
console.log('Setting up middleware...');
app.use(express.json());

// Connect to MongoDB
console.log('Attempting to connect to MongoDB...');
mongoose.connect('mongodb://127.0.0.1:27017/baitap31_3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    console.log('Database Name: baitap31_3');
}).catch(err => {
    console.error('Could not connect to MongoDB:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
});

// Routes
console.log('Setting up routes...');
app.use('/menu', menuRoutes);

// Health check route
app.get('/health', (req, res) => {
    console.log('Health check endpoint called');
    res.status(200).send({ status: 'OK', message: 'Server is running' });
});

// Start server
console.log('Starting server...');
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Available routes:`);
    console.log(`  GET  /menu       - Fetch hierarchical menu`);
    console.log(`  POST /menu       - Create a new menu`);
    console.log(`  PUT  /menu/:id   - Update a menu`);
    console.log(`  DELETE /menu/:id - Delete a menu`);
    console.log(`  GET  /health     - Health check`);
});
