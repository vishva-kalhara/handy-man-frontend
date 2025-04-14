import { Task } from "./task";
import { User } from "./user";

export interface Review {
    id: string;
    ratedValue: number;
    reviewText: string;
    reviewedBy: User;
    reviewedTo: User;
    task: Task;
}
