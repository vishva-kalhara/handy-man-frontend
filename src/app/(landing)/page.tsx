import TaskCard from "@/components/task-card";
import { Task } from "@/types/task";

const tasks: Task[] = [
    {
        id: "1",
        title: "Fix leaky faucet",
        description: "Repair the leaky faucet in the kitchen sink.",
        image: "https://res.cloudinary.com/american-bath-group/image/upload/c_scale,q_100,w_1520/v1632382060/websites-product-info-and-content/swan/content/products/kitchen/kitchen-sinks/swan-featureproduct-kitchensinks5.jpg",
        maxPrice: 100,
        isEmergency: true,
        taskStatus: "PENDING",
        createdAt: "2023-11-01T00:00:00Z",
        creator: {
            id: "user1",
            displayName: "John Doe",
            profileImage:
                "https://geediting.com/wp-content/uploads/2023/12/newimagesize-2023-04-02T192008.840.png",
            // "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
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
        ],
    },
    {
        id: "2",
        title: "Paint living room",
        description:
            "Repaint the living room walls with a fresh coat of paint.",
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

export default function Home() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}
