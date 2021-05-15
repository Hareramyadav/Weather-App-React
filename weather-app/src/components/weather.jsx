import React from 'react';
import './weather.css';

export const Weather = (props) =>{
    return(
        <div className="container">
            <div className="cards">
                <h1>{props.city}</h1>
                <h5 className="py-4 mt-4">
                    <i className={`wi ${props.weatherIcon}`} ></i>
                </h5>
                {props.temp ? <h1 className="py-2">{props.temp}&deg;</h1>:null}
                {minmaxTemp(props.temp_min, props.temp_max)}
                <h4 className="py-2">{props.description}</h4>
            </div>
        </div>
    )
}

const minmaxTemp = (min, max) =>{
    if(min && max){
        return(
            <h3>
                <span className="px-3">{min}&deg;</span>
                <span className="px-3">{max}&deg;</span>
            </h3>
        )
    }
}
