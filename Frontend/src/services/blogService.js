import axios from 'axios';

const API = 'http://localhost:8080/api/blogs';

export const saveDraft = (blog) => axios.post(`${API}/draft`, blog);
export const publishBlog = (id) => axios.post(`${API}/publish/${id}`);
export const getAllBlogs = () => axios.get(API);
export const getBlogById = (id) => axios.get(`${API}/${id}`);
