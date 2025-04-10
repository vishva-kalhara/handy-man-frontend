import { User } from "./user";

export interface Review {
    id: string; // UUID
    ratedValue: number; // Double
    reviewText: string;
    reviewedBy: User;
}
