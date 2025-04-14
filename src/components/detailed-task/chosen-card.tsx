const ChosenCard = () => {
    return (
        <div className="flex bg-green-100/75 border-green-400 border p-6 rounded-xl relative flex-col">
            <h4 className="font-semibold text-green-600 text-base">
                Task owner has chosen you!
            </h4>
        </div>
    );
};

export default ChosenCard;
