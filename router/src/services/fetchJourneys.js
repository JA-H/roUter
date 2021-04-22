import axios from 'axios';
const baseUrl = 'http://127.0.0.1:5000/'


const fetchJourneys = async () => {
    const response = await axios.get(`${baseUrl}/users/2/journeys`)
    return response
}


export default fetchJourneys