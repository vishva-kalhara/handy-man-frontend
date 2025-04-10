import { Task } from "./task";
import { User } from "./user";

export interface Bid {
    id: string; // UUID
    price: number; // Double
    bidStatus: "PENDING" | "REJECTED" | "ACCEPTED";
    createdAt: string; // ISO 8601 string for LocalDateTime
    associatedTask: Task;
    bidder: User;
}
