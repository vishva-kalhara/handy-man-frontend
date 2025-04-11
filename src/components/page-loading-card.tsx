import Spinner from "./spinner";

const PageLoadingCard = () => {
    return (
        <div className="max-w-lg mx-auto flex  justify-center flex-col mb-10 py-8">
            <div className="flex justify-center">
                <Spinner size={"large"} />
            </div>
            <h1 className="font-semibold text-2xl text-center mt-8">
                Hang On Tight!
            </h1>
            <p className="text-base text-center text-black/50 mt-2">
                Securely fetching your latest activity &#8211; this ensures
                everything&apos;s up-to-date.
            </p>
        </div>
    );
};

export default PageLoadingCard;
