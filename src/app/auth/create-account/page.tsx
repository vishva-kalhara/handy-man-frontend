import BlueLink from "@/components/blue-link";
import Card from "@/components/card";
import RegisterForm from "@/forms/auth/register-form";

const Page = () => {
    return (
        <Card
            heading="Create Account"
            description="30 seconds to sign up &#8211; then post tasks or bid on jobs immediately."
            extraNodes={
                <BlueLink
                    href="/auth/sign-in"
                    text="Already have an Account?"
                />
            }
        >
            <RegisterForm />
        </Card>
    );
};

export default Page;
