const express = require ('express')
const cors = require('cors')
const app = express()

// habilita CORS para cualquier origen
app.use(cors())

// middleware, intercepta requests en formato JSON y los convierte en un obj de JS
app.use(express.json())

// prefijo de todas las rutas
const museumsRoutes = require('./routes/museums.routes');
app.use('/api/museums', museumsRoutes);

module.exports = app;
