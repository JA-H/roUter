import axios from 'axios'
const baseUrl = 'http://127.0.0.1:5000/'



const createUser = async (data) => {
    const response = await axios.post(`${baseUrl}/users`,data)
    return response.data
}

const loginUser = async (data) => {
    const response = await axios.post(`${baseUrl}/login`,data)
    return response.data
}

export default { createUser, loginUser }