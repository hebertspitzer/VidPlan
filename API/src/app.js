const express = require('express');
const cors = require('cors');

const recommendationRoutes = require('./routes/recommendation.routes');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/recommendations', recommendationRoutes);

module.exports = app;