import axios from "axios";
import { BACKEND_URL } from "../basePath";
import { Blog, createBlog } from "../interface/blog";

const api = axios.create({
     baseURL: BACKEND_URL,
});

export const getAllBlogs = async (filters?: { search?: string; category?: string }) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/post?${params.toString()}`);
    return response.data;
};

export const getBlog = async (id: string): Promise<Blog> => {
     const response = await api.get(`/post/${id}`);
     return response.data;
};

export const createBlogPost = async (blogData: createBlog): Promise<Blog> => {
     const response = await api.post("/post/create", blogData);
     return response.data;
};

export const updateBlogPost = async (
     id: string,
     blogData: createBlog
): Promise<Blog> => {
     const response = await api.put(`/post/${id}`, blogData);
     return response.data;
};

export const deleteBlogPost = async (id: string): Promise<void> => {
     await api.delete(`/post/${id}`);
};
