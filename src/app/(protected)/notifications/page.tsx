import Card from "@/components/card";
import Link from "next/link";

const Page = () => {
    return (
        <Card
            heading="Notifications"
            description="Manage your notifications here."
        >
            <Link href={""}>
                <p className="text-gray-600 hover:bg-gray-100 hover:cursor-pointer font-semibold bg-gray-50 py-2.5 px-4 rounded-md mb-3 text-start text-sm border border-gray-200 border-l-[6px] border-l-blue-500">
                    Review your handyman!
                </p>
            </Link>
        </Card>
    );
};

export default Page;
