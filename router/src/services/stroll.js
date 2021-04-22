import axios from 'axios';
const baseUrl = 'http://127.0.0.1:5000/'


const getPolyLine = async (data) => {
    const response = await axios.post(`${baseUrl}/users/2/journeys`,data)
    return response.data
}

export default getPolyLine 