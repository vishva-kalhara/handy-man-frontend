import Card from "@/components/card";
import InputField from "@/components/input-field";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Page = () => {
    return (
        <Card
            heading="Welcome Back"
            description="Access your tasks, bids, and messages in one click."
        >
            <form>
                <InputField displayName="Email:" error="" />
                <InputField displayName="Password" error="Required field!" />

                {/* <p className="text-red-600 mt-2 bg-red-100 rounded-sm py-2 px-2 text-center border border-red-300 text-sm">
                    Internal Server Error: 500
                </p> */}

                <Button className="w-full py-6 mt-2">
                    Sign In <ArrowRight size={5} />
                </Button>
            </form>
        </Card>
    );
};

export default Page;
