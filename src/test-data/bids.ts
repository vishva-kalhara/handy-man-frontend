import { Bid } from "@/types/bid";

export const bids: Bid[] = [
    {
        id: "bid1",
        price: 1000,
        bidStatus: "PENDING",
        createdAt: "2023-11-02T00:00:00Z",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        associatedTask: null as any, // Placeholder to avoid circular reference
        bidder: {
            id: "user2",
            displayName: "Jane Smith",
            profileImage:
                "https://geediting.com/wp-content/uploads/2023/12/newimagesize-2023-04-02T192008.840.png",
            bio: "Professional plumber with 10 years of experience.",
            myRating: 4.9,
            reviewsIGot: [],
        },
    },
    {
        id: "bid2",
        price: 1500,
        bidStatus: "PENDING",
        createdAt: "2023-11-02T00:00:00Z",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        associatedTask: null as any, // Placeholder to avoid circular reference
        bidder: {
            id: "user2",
            displayName: "Jane Smith",
            profileImage:
                "https://geediting.com/wp-content/uploads/2023/12/newimagesize-2023-04-02T192008.840.png",
            bio: "Professional plumber with 10 years of experience.",
            myRating: 4.9,
            reviewsIGot: [],
        },
    },
    {
        id: "bid3",
        price: 2400,
        bidStatus: "PENDING",
        createdAt: "2023-11-02T00:00:00Z",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        associatedTask: null as any, // Placeholder to avoid circular reference
        bidder: {
            id: "user2",
            displayName: "Jane Smith",
            profileImage:
                "https://geediting.com/wp-content/uploads/2023/12/newimagesize-2023-04-02T192008.840.png",
            bio: "Professional plumber with 10 years of experience.",
            myRating: 4.9,
            reviewsIGot: [],
        },
    },
];
