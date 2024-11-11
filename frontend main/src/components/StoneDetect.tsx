import PredictionCard from "./PredictionCard";
import { useNavigate } from "react-router-dom";

const StoneDetect = () => {
  const navigate = useNavigate();
  const handleDataPrediction = () => {
    navigate("/PredictByData", { replace: true });
  };
  const handleImagePrediction = () => {
    navigate("/PredictByImage", { replace: true });
  };
  return (
    <div className="flex flex-col lg:mx-20  py-20">
      <h2 className="text-2xl font-bold pb-20 text-center">
        Detect or predict kidney stone
      </h2>
      <div className="flex justify-around">
        <PredictionCard
          title={"By Data"}
          description={"Predict kidney stone by entering data"}
          handleClick={handleDataPrediction}
        />
        <PredictionCard
          title={"By image"}
          description={"Predict kidney stone by image"}
          handleClick={handleImagePrediction}
        />
      </div>
    </div>
  );
};

export default StoneDetect;
