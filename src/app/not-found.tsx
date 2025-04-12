import PageMessage from "@/components/page-message";

const Page = () => {
    return (
        <PageMessage
            tag="Not Found"
            title="Page Not found"
            description="This page isn't where you left it. Try checking the link or head back home."
            links={{
                action: {
                    text: "Back to Home",
                    link: "/",
                },
            }}
        />
    );
};

export default Page;
