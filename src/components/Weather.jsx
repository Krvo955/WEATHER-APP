import React, { useEffect, useState } from 'react'
import icon from  '../assets/icon.png'
import heavy from  '../assets/heavy.png'
import humidity from  '../assets/humidity.png'
import wind from  '../assets/wind.png'
import sun from  '../assets/sun.png'
import cloudy from  '../assets/cloudy.png'
import weather from  '../assets/weather.png'
import clearsky from '../assets/clearsky.png'
import fewclouds from '../assets/fewclouds.png'
import showerrain from '../assets/showerrain.png'
import snow from '../assets/snow.png'
import thunderstorm from '../assets/thunderstorm.png'
import skt from  '../assets/skt.png'
import './Weather.css'

const Weather = () => {
  const [weatherData,setWeatherData]=useState(false);
  const allIcon= {
"01d" : sun,
"01n":clearsky,
"02d":cloudy,
"02n":fewclouds,
"03d":cloudy,
"03n":cloudy,
"04n":skt,
"09d":showerrain,
"09n":showerrain,
"10d":thunderstorm,
"10n":thunderstorm,
"13d":snow,
"13n":snow
  }
  const search= async (city) => {
  try{ 
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    const response= await fetch(url);
    const data= await response.json();
    console.log(data);
    const icon=allIcon[data.weather[0].icon] || clearsky;
    setWeatherData({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temperature: Math.floor(data.main.temp),
      location:data.name,
      icon:icon
    });


  }
  catch(error){
console.log(error);
  }
}
useEffect(()=>{
 search("Kitale");
},[]);

  return (
    <div className='weather'>
        <div className='search_bar'>
            <input type="text" placeholder='Search' />
            <img src={icon} alt="" />
        </div>
         <img src={heavy} alt="" className='weather-icon'/>
         <p className='temperature'>{weatherData.temperature}°C</p>
         <p className='location'>{weatherData.location}</p>
         <div className='weather-data'>
         <div className='column'>
            <img src={humidity} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
            </div>
         </div>
          <div className='column'>
            <img src={wind} alt="" />
            <div>
                <p>{weatherData.windSpeed}KM/H</p>
                <span>Wind Spreed</span>
            </div>
         </div>
          
        </div>
    </div>
  )
}

export default Weather;