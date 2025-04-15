import { Bid } from "./bid";
import { Category } from "./category";
import { Review } from "./review";
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
    creator: Pick<User, "id" | "profileImage" | "displayName" | "avgRating">;
    chosenBidder: Pick<
        User,
        "id" | "profileImage" | "displayName" | "avgRating"
    > | null;
    category: Category;
    bids: Bid[];
    reviews: Review[];
};
