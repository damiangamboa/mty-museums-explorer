/*
Recibe requests
Llama a services (consume data)
Devolver responses
*/

const museumsService = require('../services/museums.service')

// get /api/museums > return all museums

const getMuseums = (req, res) => {
    try {
        // get data
        const museums = museumsService.getAllMuseums();

        // response
        res.json(museums);
    } catch (error) {

        // errors
        res.status(500).json({
            message: 'Internal server error',
        })
    
    }
    
} // end function
    module.exports = {
        getMuseums
    }
