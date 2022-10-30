import axios from 'axios'

const register = async (adminData) => {
    const response = await axios.post(`http://localhost:4000/api/admin/register`, adminData)

    if (response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data))
    }
    return response.data
}

const login = async (adminData) => {
    const response = await axios.post(`http://localhost:4000/api/admin/login`, adminData)

    if (response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data))
    }
    return response.data
}

const logout = () => {
    localStorage.removeItem('admin')
}

const authService = {
    login,
    register, 
    logout,
}
export default authService