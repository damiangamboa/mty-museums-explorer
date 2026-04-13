const express = require ('express')
const cors = require('cors')
const path = require('path');
const app = express()

// habilita CORS para cualquier origen
app.use(cors())

// middleware, intercepta requests en formato JSON y los convierte en un obj de JS
app.use(express.json())

app.use('/assets', express.static(path.join(__dirname, '..', '..', 'client', 'assets')));

// prefijo de todas las rutas
const museumsRoutes = require('./routes/museums.routes');
app.use('/api/museums', museumsRoutes);

module.exports = app;
