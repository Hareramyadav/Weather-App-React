import React, {useState ,useEffect} from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Weather} from './components/weather';
import {Form} from './components/form';


const API_KEY = '0889164b61dd7eec3985606a528fd96d'

const calCelcius =(tempr)=>{
  let celcius =Math.floor(tempr-273.15)
  return celcius
}

function App() {

  const [state, setState] = useState({
    city:undefined,
    country:undefined,
    icon:undefined,
    main:undefined,
    temp:undefined,
    celcius:undefined,
    temp_max:undefined,
    temp_min:undefined,
    description:"",
    error:false
  })

  useEffect(() => {
    async function getWeather() {
      // You can await here
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`);
      const response = await api_call.json();
      console.log(response)
      // const response = await MyAPI.getData(someId);
      
      setState({
        city:response.name,
        country: response.sys.country,
        temp:calCelcius(response.main.temp),
        temp_min:calCelcius(response.main.temp_min),
        temp_max:calCelcius(response.main.temp_max),
        description:response.weather[0].description,
      })
    }

    // getWeather();
  },[]); // Or [] if effect doesn't need props or state

  return (
    <div className="App">
      <Form />
      <Weather 
      city={state.city} 
      country={state.country} 
      temp={state.temp} 
      temp_min={state.temp_min} 
      temp_max={state.temp_max} 
      description={state.description} 
      weatherIcon={state.icon}
      />
    </div>
  );
}

export default App;



// const weatherIcon = {
//   Thunderstorm:"wi-thunderstorm",
//   Clear:"wi-day-sunny",
//   Clouds:"wi-day-fog",
//   Drizzle:"wi-sleet",
//   Snow:"wi-snow",
//   Rain:"wi-storm-showers",
//   Atmosphere:"wi-fog",
// }

// const get_weatherIcon = (icons, rangeId) =>{
//   switch(true){
//     case(rangeId>=200 && rangeId <=232):
//       setState({icon:weatherIcon.Thunderstorm});
//       break;
//     case(rangeId >=300 && rangeId <=321):
//       setState({icon:weatherIcon.Drizzle});
//       break;
//     case(rangeId >=500 && rangeId <=531):
//       setState({icon:weatherIcon.Rain});
//       break;
//     case(rangeId >=600 && rangeId <=622):
//       setState({icon:weatherIcon.Snow});
//       break;
//     case(rangeId >=701 && rangeId <=781):
//       setState({icon:weatherIcon.Atmosphere});
//       break;
//     case(rangeId >=801 && rangeId <=804):
//       setState({icon:weatherIcon.Clouds});
//       break;
//     case(rangeId === 800):
//       setState({icon:weatherIcon.Clear});
//       break;
//     default:
//       setState({icon:weatherIcon.Clouds});
//   }
// }
// get_weatherIcon(weatherIcon, response.weather[0].id);