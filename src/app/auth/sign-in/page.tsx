import BlueLink from "@/components/blue-link";
import Card from "@/components/card";
import LoginForm from "@/forms/auth/login-form";

const Page = () => {
    return (
        <Card
            heading="Welcome Back"
            description="Access your tasks, bids, and messages in one click."
            extraNodes={
                <BlueLink
                    href="/auth/create-account"
                    text="Don't have an Account?"
                />
            }
        >
            <LoginForm />
        </Card>
    );
};

export default Page;
