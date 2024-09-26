import { User } from "next-auth";
import { Comment } from "./comment";

export interface Blog {
     id: number;
     author: User;
     category: number;
     topic: string;
     content: string;
     comments: Comment[]
}

export interface createBlog {
     category: Category; // Ensure the type matches your enum
     topic: string;
     content: string;
     authorId: number;
}

export enum Category {
     History = "History",
     Food = "Food",
     Pets = "Pets",
     Health = "Health",
     Fashion = "Fashion",
     Exercise = "Exercise",
     Others = "Others",
}

export const CategoryLabels: { [key in Category]: string } = {
     [Category.History]: "History",
     [Category.Food]: "Food",
     [Category.Pets]: "Pets",
     [Category.Health]: "Health",
     [Category.Fashion]: "Fashion",
     [Category.Exercise]: "Exercise",
     [Category.Others]: "Others",
};
