const express = require('express');

const recommendationRoutes = require('./routes/recommendation.routes');

const app = express();

app.use(express.json());

app.use('/api/recommendations', recommendationRoutes);

module.exports = app;