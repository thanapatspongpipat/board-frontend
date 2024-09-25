import { User } from "next-auth"; // Adjust the import based on where your User interface is defined
import { Blog } from "./blog";

export interface Comment {
    id: number;       // Unique identifier for the comment
    content: string;  // Content of the comment
    post: Blog;   // ID of the post to which the comment belongs
    authorId: number; // ID of the user who authored the comment
    createdAt: Date;  // Timestamp of when the comment was created
    updatedAt: Date;  // Timestamp of when the comment was last updated
    author?: User;    // Optional user object (to include author's details)
}
