/* Responsible for handling business logic related to museums.
    - Reads data from museums.json
    - Return list of museums.
*/

const museums = require('../data/museums.json')

// get all museums, returns {array}
const getAllMuseums = () => {
    return museums;
}

// export functions > controller
module.exports = {
    getAllMuseums,
}