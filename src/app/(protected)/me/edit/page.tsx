import Card from "@/components/card";
import UpdateMyBioForm from "@/forms/users/update-my-bio-form";
import UpdateMyPictureForm from "@/forms/users/update-my-picture-form";

const Page = () => {
    return (
        <Card
            heading="Edit Profile"
            description="Update your profile information."
        >
            <UpdateMyPictureForm />
            <UpdateMyBioForm />
        </Card>
    );
};

export default Page;
