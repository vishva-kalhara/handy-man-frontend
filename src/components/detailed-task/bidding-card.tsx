import CreateBidForm from "@/forms/bids/create-bid-form";

type Props = {
    taskId: string;
    taskStatus: "PENDING" | "WAITING_TO_COMPLETE" | "COMPLETED";
};

const BiddingCard = ({ taskId, taskStatus }: Props) => {
    return (
        <div className="flex bg-white p-6 border border-black/15 rounded-xl relative flex-col">
            <h4 className="font-semibold text-base">Make an Offer</h4>
            <p className="text-black/60 mt-2 text-sm mb-6">
                Competitive offers within the poster&apos;s budget range get
                noticed faster!
            </p>
            {taskStatus != "PENDING" ? (
                <p className="text-red-500 font-semibold bg-red-50 py-2.5 px-4 rounded-md mt-2 text-center text-sm border border-red-200">
                    Task no longer accepts offers!
                </p>
            ) : (
                <CreateBidForm taskId={taskId} />
            )}
        </div>
    );
};

export default BiddingCard;
