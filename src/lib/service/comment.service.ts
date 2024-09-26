import axios from "axios";
import { BACKEND_URL } from "../basePath";
import { Comment, CreateComment } from "../interface/comment";

const api = axios.create({
     baseURL: BACKEND_URL,
});

export const getAllComment = async (): Promise<Comment[]> => {
     const response = await api.get("/comment");
     return response.data;
};

export const getComment = async (id: string): Promise<Comment> => {
     const response = await api.get(`/comment/${id}`);
     return response.data;
};

export const createComment = async (blogData: CreateComment): Promise<Comment> => {
     const response = await api.post("/comment/create", blogData);
     return response.data;
};

export const updateComment = async (
     id: string,
     blogData: CreateComment
): Promise<Comment> => {
     const response = await api.put(`/comment/${id}`, blogData);
     return response.data;
};

export const deleteComment = async (id: string): Promise<void> => {
     await api.delete(`/comment/${id}`);
};
