const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const urlRoutes = require('./routes/urlRoutes');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true 
}));


//rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.use('/', urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
