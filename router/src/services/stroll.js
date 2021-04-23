import axios from 'axios';
const baseUrl = 'http://127.0.0.1:5000/'


const getPolyLine = async (data,id) => {
    const response = await axios.post(`${baseUrl}/users/${id}/journeys`,data)
    return response.data
}


export default getPolyLine