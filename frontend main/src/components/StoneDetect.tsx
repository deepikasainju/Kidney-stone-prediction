import PredictionCard from "./PredictionCard";

const StoneDetect = () => {
  return (
    <div className="flex flex-col lg:mx-20  py-20">
      <h2 className="text-2xl font-bold pb-20 text-center">
        Detect or predict kidney stone
      </h2>
      <div className="flex justify-around">
        <PredictionCard
          title={"By Data"}
          description={"Predict kidney stone by entering data"}
        />
        <PredictionCard
          title={"By image"}
          description={"Predict kidney stone by image"}
        />
      </div>
    </div>
  );
};

export default StoneDetect;
