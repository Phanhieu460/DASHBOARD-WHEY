import axios from 'axios'


const register = async (userData) => {
    const response = await axios.post(`${process.env.API_URL}/user/register`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const login = async (userData) => {
    const response = await axios.post(`${process.env.API_URL}/user/login`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    login,
    register, 
    logout,
}
export default authService