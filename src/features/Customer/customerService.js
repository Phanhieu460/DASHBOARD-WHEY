import axios from  'axios'

const createCustomer = async (productData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`http://localhost:4000/customer`, productData, config)
    return response.data

}
const updateCustomer = async (productData, token, id)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const data = productData.dataProject
    const response = await axios.patch(`http://localhost:4000/customer/${id}`, data, config)
    return response.data

}
const getCustomer = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`http://localhost:4000/customer`, config)
    return response.data
}
const getCustomerById = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`http://localhost:4000/customer/${id}`, config)
    return response.data
}
const deleteCustomer = async (productId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(`http://localhost:4000/customer/${productId}`, config)
  
    return response.data
  }

const  projectService= {
    createCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}
export default projectService