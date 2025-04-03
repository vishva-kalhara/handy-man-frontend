import Card from "@/components/card";
import RegisterForm from "@/forms/auth/register-form";

const Page = () => {
    return (
        <Card
            heading="Create Account"
            description="30 seconds to sign up &hyphen; then post tasks or bid on jobs immediately."
        >
            <RegisterForm />
        </Card>
    );
};

export default Page;
