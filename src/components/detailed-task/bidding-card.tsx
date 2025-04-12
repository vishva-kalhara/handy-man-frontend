import CreateBidForm from "@/forms/bids/create-bid-form";

const BiddingCard = ({}: { taskId: string }) => {
    return (
        <div className="flex bg-white p-6 border border-black/15 rounded-xl relative flex-col">
            <h4 className="font-semibold text-base">Make an Offer</h4>
            <p className="text-black/60 mt-2 text-sm mb-6">
                Competitive offers within the poster&apos;s budget range get
                noticed faster!
            </p>
            <CreateBidForm />
        </div>
    );
};

export default BiddingCard;
