
import './App.css';
import { useEffect, useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";

import Sunny from "./assests/sunny.avif";
import Cloudy from "./assests/cloudy.avif";
import Rainy from "./assests/rainy.avif";
import Snow from "./assests/snow.avif";
import Overcast from "./assests/overcast.avif";


function App() {

  const[place, setPlace]=useState("africa")
  const[placeInfo,setPlaceInfo]=useState({})


  useEffect(()=>{

    handleFetch();
  }, [])

  const handleFetch=() =>{

  fetch(`http://api.weatherapi.com/v1/forecast.json?key=595393b0db8c48e483b75402222308&q=${place}&days=1&aqi=no&alerts=no`)
  .then((response) => response.json())
  .then((data) => setPlaceInfo({
    name: data.location.name,
    country: data.location.country,
    farenheit: {
      current: data.current.temp_f,
      high: data.forecast.forecastday[0].day.maxtemp_f,
      low: data.forecast.forecastday[0].day.mintemp_f
    },
    condition: data.current.condition.text
  })
);


};



  // console.log(placeInfo)
  return (
    <div className="app" style={placeInfo.condition?.toLowerCase() ==="clear"|| placeInfo.condition?.toLowerCase()==="sunny" ? { backgroundImage: `url(${Sunny})` }
    : placeInfo.condition?.includes("cloudy")
    ? { backgroundImage: `url(${Cloudy})` }
    : placeInfo.condition?.toLowerCase().includes("rainy")
    ? { backgroundImage: `url(${Rainy})` }
    : placeInfo.condition?.toLowerCase().includes("snow")
    ? { backgroundImage: `url(${Snow})` }
    : { backgroundImage: `url(${Overcast})` } } >
    <div className='search-input '>
    <input type="text" value={place} onChange={(e)=>setPlace(e.target.value)}/>
    <SearchIcon
          onClick={handleFetch}
          fontSize="large"
          className="search-button"
        />
       

    </div>
    <div className="weather-container">
        <div className="top-part">
          <h1>{placeInfo.farenheit?.current}° F</h1>
          <div className="condition-high-low">
            <h1>{placeInfo.condition}</h1>
            <h1>{placeInfo.farenheit?.high}° F</h1>
            <h1>{placeInfo.farenheit?.low}° F</h1>
          </div>
        </div>
        <h2>
          {placeInfo.name}, {placeInfo.country}
        </h2>
      </div>
    </div>
  );
}

export default App;
