import { Task } from "@/types/task";

export const tasks: Task[] = [
    {
        id: "1",
        title: "Fix leaky faucet",
        description:
            "The kitchen sink faucet has developed a persistent leak that needs immediate attention. The issue has been causing water wastage and increasing the water bill. The task involves identifying the root cause of the leak, whether it's a worn-out washer, a damaged valve, or another issue, and repairing it effectively. The handyman should have experience in plumbing repairs and bring the necessary tools and replacement parts. This is an urgent task as the leak has been ongoing for a few days, and the homeowner is looking for a quick and reliable solution to restore the faucet to proper working condition.",
        image: "https://res.cloudinary.com/american-bath-group/image/upload/c_scale,q_100,w_1520/v1632382060/websites-product-info-and-content/swan/content/products/kitchen/kitchen-sinks/swan-featureproduct-kitchensinks5.jpg",
        maxPrice: 100,
        isEmergency: true,
        taskStatus: "PENDING",
        createdAt: "2023-11-01T00:00:00Z",
        creator: {
            id: "user1",
            displayName: "Anjela Grace",
            profileImage:
                "https://geediting.com/wp-content/uploads/2023/12/newimagesize-2023-04-02T192008.840.png",
            bio: "Experienced handyman specializing in plumbing repairs.",
            myRating: 4.8,
            reviewsIGot: [],
        },
        category: {
            id: "cat1",
            categoryName: "Plumbing",
        },
        bids: [
            {
                id: "bid1",
                price: 90,
                bidStatus: "PENDING",
                createdAt: "2023-11-02T00:00:00Z",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                // Placeholder to avoid circular reference
                bidder: {
                    id: "user2",
                    displayName: "Jane Smith",
                    profileImage:
                        "https://geediting.com/wp-content/uploads/2023/12/newimagesize-2023-04-02T192008.840.png",
                    bio: "Professional plumber with 10 years of experience in handling a wide range of plumbing issues, including leak repairs, pipe installations, and maintenance. Jane is known for her attention to detail, reliability, and ability to provide long-lasting solutions to complex plumbing problems. She has worked on both residential and commercial projects, earning a reputation for delivering high-quality work and excellent customer service. Jane is committed to ensuring customer satisfaction and takes pride in her ability to diagnose and resolve plumbing issues efficiently. Her expertise and dedication make her a trusted choice for any plumbing-related task.",
                    myRating: 4.9,
                    reviewsIGot: [],
                },
            },
        ],
    },
    {
        id: "2",
        title: "Paint living room",
        description:
            "Repainting the living room walls is a task that requires careful preparation and attention to detail to achieve a flawless finish. The goal is to refresh the space with a new coat of paint, enhancing the room's aesthetic appeal and creating a welcoming atmosphere. This task involves selecting the appropriate paint color and finish, preparing the walls by cleaning, sanding, and applying primer if necessary, and then applying the paint evenly to ensure a smooth and professional look. The handyman should have experience in interior painting, possess the necessary tools such as brushes, rollers, and drop cloths, and be able to work efficiently while protecting the furniture and flooring from paint splatters. The homeowner is looking for a skilled painter who can transform the living room into a vibrant and inviting space, paying close attention to detail and ensuring the job is completed to the highest standard.",
        image: "https://media.designcafe.com/wp-content/uploads/2024/08/18064403/simple-wall-painting-ideas.jpg",
        maxPrice: 300,
        isEmergency: false,
        taskStatus: "WAITING_TO_COMPLETE",
        createdAt: "2023-11-05T00:00:00Z",
        creator: {
            id: "user3",
            displayName: "Alice Johnson",
            // profileImage:
            //     "https://geediting.com/wp-content/uploads/2023/12/newimagesize-2023-04-02T192008.840.png",
            bio: "Painter with a passion for transforming spaces.",
            myRating: 4.7,
            reviewsIGot: [],
        },
        category: {
            id: "cat2",
            categoryName: "Painting",
        },
        bids: [
            {
                id: "bid2",
                price: 250,
                bidStatus: "PENDING",
                createdAt: "2023-11-06T00:00:00Z",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                associatedTask: null as any, // Placeholder to avoid circular reference
                bidder: {
                    id: "user4",
                    displayName: "Bob Brown",
                    profileImage:
                        "https://geediting.com/wp-content/uploads/2023/12/newimagesize-2023-04-02T192008.840.png",
                    bio: "Experienced painter with a keen eye for detail.",
                    myRating: 4.6,
                    reviewsIGot: [],
                },
            },
        ],
    },
];
