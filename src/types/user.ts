import { Review } from "./review";

export type User = {
    id: string;
    displayName: string;
    profileImage?: string | null | undefined;
    bio?: string | null | undefined;
    myRating: number;
    reviewsIGot: Review[];
};
