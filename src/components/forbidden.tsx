import PageMessage from "./page-message";

const ForbiddenCard = () => {
    return (
        <PageMessage
            tag="Forbidden"
            title="Access Restricted"
            description="This page is reserved for Handy Man members. Please sign in to
            view bids, post tasks, or continue helping your community."
            links={{
                action: {
                    text: "Sign In Now",
                    link: "/auth/sign-in",
                },
                fallback: {
                    text: "Back to Home",
                    link: "/",
                },
            }}
        />
    );
};

export default ForbiddenCard;
