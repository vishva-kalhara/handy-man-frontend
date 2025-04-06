import Card from "@/components/card";
import CreateTaskForm from "@/forms/tasks/create-task-form";

const Page = () => {
    return (
        <Card
            heading="Create New Task"
            description="Describe what you need, set your budget, and get help fast – mark as emergency for priority service."
        >
            <CreateTaskForm />
        </Card>
    );
};

export default Page;
