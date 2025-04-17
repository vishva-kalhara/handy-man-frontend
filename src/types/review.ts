import { Task } from "./task";
import { User } from "./user";

export interface Review {
    id: string;
    ratedValue: number;
    reviewText: string;
    reviewedBy: User;
    reviewGot: User;
    task: Task;
    reviewedAt: Date;
    reviewGotAsRole: "HANDY_MAN" | "TASK_OWNER";
}
