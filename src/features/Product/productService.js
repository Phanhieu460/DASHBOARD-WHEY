import axios from  'axios'

const createProduct = async (productData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`http://localhost:4000/products`, productData, config)
    return response.data

}
const updateProduct = async (productData, token, id)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const data = productData.dataProject
    const response = await axios.patch(`http://localhost:4000/products/${id}`, data, config)
    return response.data

}
const getProduct = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`http://localhost:4000/products`, config)
    return response.data
}
const getProductById = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`http://localhost:4000/products/${id}`, config)
    return response.data
}
const deleteProduct = async (productId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(`http://localhost:4000/products/${productId}`, config)
  
    return response.data
  }

const  projectService= {
    createProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct
}
export default projectService