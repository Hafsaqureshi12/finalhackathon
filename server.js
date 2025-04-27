// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// CONFIG
dotenv.config();


// APP SETUP
const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARES
app.use(cors());
app.use(express.json()); // Accept JSON data

// TEST ROUTE
app.get('/', (req, res) => {
  res.send('API is running...');
});

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB Connected ✅');
    // Start Server Only When DB is Connected
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} 🚀`);
    });
})
.catch((error) => {
    console.error('MongoDB Connection Error ❌:', error);
});

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
