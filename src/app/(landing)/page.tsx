import FilterForm from "@/forms/tasks/filter-form";
import TaskCard from "@/components/task-card";
import { tasks } from "@/test-data/tasks";

export default function Home() {
    return (
        <>
            <FilterForm />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </>
    );
}
