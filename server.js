require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

const { log } = console;
const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/kbss');

app.use(express.urlencoded({
    extended: false,
}));
app.use(express.json());
app.use(cors());

app.use('/api', apiRoutes);

app.listen(PORT, () => log('Server is starting ', PORT));
