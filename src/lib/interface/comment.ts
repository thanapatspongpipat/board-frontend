import { Blog } from "./blog";
import { User } from "./user";


export interface Comment {
     id: number;
     content: string;
     post: Blog;
     authorId: number;
     createdAt: Date;
     updatedAt: Date;
     author: User;
}

export interface CreateComment {
     content: string;
     authorId: number;
     postId: number;
}
