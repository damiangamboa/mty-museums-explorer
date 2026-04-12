// Handle communication with the backend server

// The base URL for our backend local server
const API_URL = 'http://localhost:3000/api/museums'

export async function getMuseums() {
    try {
        // Send a GET request to the backend
        const response = await fetch(API_URL)

        // Check if the response was successful (status 200-299)
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`)
        } // end if

        // Parse the response body from JSON to a JS object
        const data = await response.json()
        return data;

    } catch (error) {
        console.error("Connection to API failed:", error)
        throw error; // para que app.js lo capture en su catch
    } // end try



} // end function