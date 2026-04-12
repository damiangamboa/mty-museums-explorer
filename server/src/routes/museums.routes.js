// Define API endpoints and connects them to controllers.

const express = require('express');
const router = express.Router();

const museumController = require('../controllers/museums.controller')

// get /api/museums
router.get('/', museumController.getMuseums)

module.exports = router;