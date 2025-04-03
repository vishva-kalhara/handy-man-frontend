import Card from "@/components/card";
import LoginForm from "@/forms/auth/login-form";

const Page = () => {
    return (
        <Card
            heading="Welcome Back"
            description="Access your tasks, bids, and messages in one click."
        >
            <LoginForm />
        </Card>
    );
};

export default Page;
