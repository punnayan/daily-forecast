// import UilReact from '@iconscout/react-unicons/icons/uil-react'

import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndDate from "./components/TimeAndDate";
import TemparatureAndDetails from "./components/TemparatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/WeatherService";
import { useEffect, useState } from "react";
function App() {
  const [query, setQuery] = useState({ q: "kolkata" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchweather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      });
    };
    fetchweather();
  }, [query, units]);

  
  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-600 to to-blue-400 h-fit shadow-xl">
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndDate weather={weather} />
          <TemparatureAndDetails weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="Daily forecast" items={weather.daily} />
        </div>
      )}
    </div>
  );
}

export default App;
