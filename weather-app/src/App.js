import React, {Component} from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Weather} from './components/weather';
import {Form} from './components/form';


const API_KEY = '0889164b61dd7eec3985606a528fd96d'


class App extends Component{
    constructor(){
        super();
        this.state={  
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
        };

        this.weatherIcon = {
            Thunderstorm:"wi-thunderstorm",
            Clear:"wi-day-sunny",
            Clouds:"wi-day-fog",
            Drizzle:"wi-sleet",
            Snow:"wi-snow",
            Rain:"wi-storm-showers",
            Atmosphere:"wi-fog",
        }
    }

    calCelcius(tempr){
        let celcius = Math.floor(tempr-273.15)
        return celcius
      }

    get_weatherIcon(icons, rangeId){
        switch(true){
          case(rangeId>=200 && rangeId <=232):
            this.setState({icon:this.weatherIcon.Thunderstorm});
            break;
          case(rangeId >=300 && rangeId <=321):
            this.setState({icon:this.weatherIcon.Drizzle});
            break;
          case(rangeId >=500 && rangeId <=531):
            this.setState({icon:this.weatherIcon.Rain});
            break;
          case(rangeId >=600 && rangeId <=622):
            this.setState({icon:this.weatherIcon.Snow});
            break;
          case(rangeId >=701 && rangeId <=781):
            this.setState({icon:this.weatherIcon.Atmosphere});
            break;
          case(rangeId >=801 && rangeId <=804):
            this.setState({icon:this.weatherIcon.Clouds});
            break;
          case(rangeId === 800):
            this.setState({icon:this.weatherIcon.Clear});
            break;
          default:
            this.setState({icon:this.weatherIcon.Clouds});
        }
      }

    getWeather = async(e) => {
        e.preventDefault();

        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        if(city && country){
            const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
        const response = await api_call.json();
        console.log(response)

        this.setState({
            city:`${response.name} , ${response.sys.country}`,
            temp:this.calCelcius(response.main.temp),
            temp_min:this.calCelcius(response.main.temp_min),
            temp_max:this.calCelcius(response.main.temp_max),
            description:response.weather[0].description,
          })
          this.get_weatherIcon(this.weatherIcon, response.weather[0].id);
        }else{
            this.setState({error:true})
        }
    }

    render(){
        return(
            <div className="App">
                <Form loadWeather={this.getWeather} error={this.state.error} />
                <Weather 
                city={this.state.city} 
                country={this.state.country} 
                temp={this.state.temp} 
                temp_min={this.state.temp_min} 
                temp_max={this.state.temp_max} 
                description={this.state.description} 
                weatherIcon={this.state.icon}
                />
            </div>
        )
    }
}

export default App;