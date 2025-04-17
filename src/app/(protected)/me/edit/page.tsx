import Card from "@/components/card";
import UpdateMyBioForm from "@/forms/users/update-my-bio-form";

const Page = () => {
    return (
        <Card
            heading="Edit Profile"
            description="Update your profile information."
        >
            <UpdateMyBioForm />
        </Card>
    );
};

export default Page;
