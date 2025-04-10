import { Bid } from "./bid";
import { Category } from "./category";
import { User } from "./user";

export type Task = {
    id: string; // UUID
    title: string;
    description: string;
    image: string;
    maxPrice: number;
    isEmergency: boolean;
    taskStatus: "PENDING" | "WAITING_TO_COMPLETE" | "COMPLETED";
    createdAt: string;
    creator: User;
    category: Category;
    bids: Bid[];
};
