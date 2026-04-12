const express = require ('express')
const app = express()

app.use(express.json())

const museumsRoutes = require('./routes/museums.routes');
app.use('/api/museums', museumsRoutes);

module.exports = app;
