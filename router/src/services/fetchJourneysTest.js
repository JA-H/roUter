import axios from 'axios';

const fetchJourneysTest = async (url) => {
    const response = await axios.get(url)
    return response
}


export default fetchJourneysTest