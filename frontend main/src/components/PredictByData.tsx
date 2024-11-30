import { Card } from "flowbite-react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import React, { useState } from "react";

const PredictByData = () => {
  const [gravity, setGravity] = useState("");
  const [ph, setPH] = useState("");
  const [osmo, setOsmo] = useState("");
  const [cond, setCond] = useState("");
  const [urea, setUrea] = useState("");
  const [calc, setCalc] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleDataSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch("http://127.0.0.1:5000/Predictbydata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gravity, ph, osmo, cond, urea, calc }),
      });

      if (response.ok) {
        const Data = await response.json();
        setIsError(false);
        setData(
          `Stone Probability: ${Data.Stone_Probability} %, 
           No Stone Probability: ${Data.No_Stone_Probalility} %`
        );
      } else {
        setIsError(true);
        const Data = await response.json();
        setData(Data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <div>
      <Navigation />
      <h1 className="text-center mt-10 font-bold text-3xl mb-10">
        Kidney stone prediction with urine analysis
      </h1>

      <form className="max-w-md mx-auto px-5" onSubmit={handleDataSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            step="any"
            name="gravity"
            id="gravity"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => setGravity(e.target.value)}
            required
          />
          <label
            for="gravity"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            specific gravity
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            step="any"
            name="pH"
            id="pH"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => setPH(e.target.value)}
            required
          />
          <label
            for="pH"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            pH
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            step="any"
            name="osmo"
            id="osmo"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => setOsmo(e.target.value)}
            required
          />
          <label
            for="osmo"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Osmolality
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            step="any"
            name="conductivity"
            id="conductivity"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => setCond(e.target.value)}
            required
          />
          <label
            for="conductivity"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Conductivity
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            step="any"
            name="urea"
            id="urea"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => setUrea(e.target.value)}
            required
          />
          <label
            for="urea"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Urea Concentration
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            step="any"
            name="calc"
            id="calc"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => setCalc(e.target.value)}
            required
          />
          <label
            for="calc"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Calcium concentration
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </form>

      {/* REsult */}
      {data && (
        <div className="flex justify-center align-center mt-20">
          <Card className="max-w-md ">
            {isError ? (
              <h5 className="text-2xl text-center font-bold tracking-tight text-red-600 ">
                Error
              </h5>
            ) : (
              <h5 className="text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Result
              </h5>
            )}

            <p className=" text-gray-700 font-bold">
              {" "}
              <p>{data}</p>
            </p>
          </Card>
        </div>
      )}
      
      <div className="mt-3"> <Footer /> </div>
      
    </div>
  );
};

export default PredictByData;
