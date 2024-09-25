import axios from "axios";
import { env } from "process";
import { Blog, createBlog } from "../interface/blog";

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

export const getAllBlogs = async (): Promise<Blog[]> => {
    const response = await api.get("/post");
    return response.data;
};

export const getBlog = async (id:string): Promise<Blog> => {
    const response = await api.get(`/post/${id}`);
    return response.data;
};

export const createBlogPost = async (blogData: createBlog): Promise<Blog> => {
    const response = await api.post("/post/create", blogData);
    return response.data;
};

export const updateBlogPost = async (id: string, blogData: createBlog): Promise<Blog> => {
    const response = await api.put(`/post/${id}`, blogData);
    return response.data;
};

export const deleteBlogPost = async (id: string): Promise<void> => {
    await api.delete(`/post/${id}`);
};
