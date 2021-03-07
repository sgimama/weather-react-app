import React, { useState } from "react";
import useGetData from "./services/api/hooks/useGetData";

export const App = () => {

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [degrees, setDegrees] = useState("");
  const [maxtemp, setMaxtemp] = useState("");
  const [mintemp, setMintemp] = useState("");
  const [perception, setPerception] = useState("");
  const [humidity, setHumidity] = useState("");
  const [icon, setIcon] = useState("");
  const [state, setState] = useState("");
 
  const OnSubmit = async (event) => {
    event.preventDefault();
    const params = {
      q: search,
    };
    const response = await useGetData(params);
    setSearch("");
    setDegrees(formatDegress(response.main.temp));
    setCity(response.name);
    setMaxtemp(formatDegress(response.main.temp_max));
    setMintemp(formatDegress(response.main.temp_min));
    setPerception(formatDegress(response.main.feels_like));
    setHumidity(response.main.humidity);
    setIcon(response.weather[0].icon);
    setState(response.weather[0].description);
  };

  function formatDegress(degrees) {
    return degrees.toFixed(0);
  }

  return (
    <div className="App bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600">
      <div className="w-full h-full">
        <div className="grid min-h-screen grid-cols-10">
          <div className="items-center justify-center col-span-10 text-center text-white">
            <div className="col-span-10 py-8 space-y-8 text-gray-400">
              <form onSubmit={OnSubmit}>
                <input
                  className="p-3 bg-white rounded-full w-60 sm:w-80 bg-opacity-40 b-0 focus:outline-none"
                  type="search"
                  placeholder="City name"
                  
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            </div> 
            {city && 
              <div>
                <div className="col-span-10">
                  <span className="text-7xl">{city}</span>
                </div>
                <div className="col-span-10">
                  <span className="text-6xl">{degrees}°</span>
                </div>
                <div className="flex items-center justify-center col-span-10">          
                  <img src={"icons/"+icon+".png"} className="object-center brightness" alt=""/>
                </div>
                <div className="col-span-10">
                  <span className="text-5xl">{state}</span>
                </div>          
                <div className="flex items-center justify-center col-span-10 mt-4">
                  <div className="col-span-5">
                    <span className="col-span-2 p-5 text-4xl">
                      Max temp {maxtemp}°
                    </span>
                  </div>
                  <div className="col-span-5">
                    <span className="col-span-2 p-5 text-4xl">
                      Min temp {mintemp}°
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center col-span-10">
                  <div className="col-span-5">
                    <span className="col-span-2 p-5 text-4xl">
                      Perception {perception}°
                    </span>
                  </div>
                  <div className="col-span-5">
                    <span className="col-span-2 p-5 text-4xl">
                      Humidity {humidity}%
                    </span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
