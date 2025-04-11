import { Review } from "./review";
import { Task } from "./task";

export type User = {
    id: string;
    displayName: string;
    profileImage?: string | null | undefined;
    bio?: string | null | undefined;
    email: string;
    avgRating: number;
    reviewsIGot: Review[];
    tasks: Task[];
};
