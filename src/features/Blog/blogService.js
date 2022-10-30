import axios from  'axios'

const createBlog = async (blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`http://localhost:4000/blog`, blogData, config)
    return response.data

}
const updateBlog = async (blogData, token, id)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const data = blogData.dataProject
    const response = await axios.patch(`http://localhost:4000/blog/${id}`, data, config)
    return response.data

}
const getBlog = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`http://localhost:4000/blog`, config)
    return response.data
}
const getBlogById = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`http://localhost:4000/blog/${id}`, config)
    return response.data
}
const deleteBlog = async (blogId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(`http://localhost:4000/blog/${blogId}`, config)
  
    return response.data
  }

const  projectService= {
    createBlog,
    getBlog,
    getBlogById,
    updateBlog,
    deleteBlog
}
export default projectService