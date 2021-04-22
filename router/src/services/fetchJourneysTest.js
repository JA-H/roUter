import axios from 'axios';
const baseUrl = 'http://127.0.0.1:5000/'


const fetchJourneysTest = async (url) => {
    const response = await axios.get(url)
    return response
}


export default fetchJourneysTest