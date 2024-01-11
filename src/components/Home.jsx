import React from 'react'

import { useEffect, useState } from "react";
import coldBg from "../assets/cold.webp"
import hotBg from "../assets/hot1.webp"
import WeatherCard from "./WeatherCard";
import "../index.css"
import { getFormattedData } from "../weatherService";
import { FaSearch } from "react-icons/fa";

const Home = () => {

    const[weather,Setweather] = useState(null);
    const[units,Setunits] = useState("metric"); 
    const [city,Setcity] = useState("mumbai"); 
    const [bgimg,Setbgimg] = useState(hotBg);
    const [inputValue, setInputValue] = useState("");


    useEffect(()=>{
        const fetchWeatherData= async()=>{
        const data = await getFormattedData(city,units);
        if(data.cod!==200){
            alert("The City you have entered is not found. Please enter a valid citry")
            Setcity("mumbai")
            setInputValue("")
        }
        Setweather(data);
        // console.log(data)

        const tempBg = units === "metric"?20:68; 
        if(data.temp >tempBg){
            Setbgimg(hotBg);
        }else{
            Setbgimg(coldBg);
    
        }
        };
        fetchWeatherData();

    },[units , city]);

    const handleUnits = (e)=>{
        const btn = e.currentTarget;
        console.log(btn.innerText)

        if(btn.innerText==='°F'){
        btn.innerText = "°C";
        Setunits("imperial");
        }else{
        btn.innerText = "°F";
        Setunits("metric");
        }
    }

    const enterKeyPressed = (e)=>{
        if(e.keyCode=== 13){
        Setcity(e.currentTarget.value);
        e.currentTarget.blur();
        } // 13 for enter key
        // e.currentTarget.value=;
    } 

    const handleClick = (e)=>{
        Setcity(inputValue);
    }

    return (
        <div className='w-full'>
    
            <div className="App w-[200%] md:w-[100%]  h-[auto]  lg:h-[auto] bg-center bg-cover bg-repeat " style={{backgroundImage:`url(${bgimg})`}}>
                <div className="overlay py-4">
                    {
                    weather && <div className="container max-w-4xl m-auto h-[100%] flex flex-col items-center justify-between p-4">
                    <div className="slide-left section section__inputs m-4 space-x-2">
                        
                        <div className=" section section__inputs">
                            <input onKeyDown={enterKeyPressed} className="text-black " type="text" name="city" placeholder="Enter the City..." 
                            onChange={(e)=>setInputValue(e.target.value)}/>
                            <button onClick={handleClick} className='text-black py-3 px-10 border-none rounded-[0.4rem] font-bold cursor-pointer bg-white hover:bg-gray-200 m-4 md:m-0'><FaSearch/></button>
                        </div>

                        <button  className="text-black py-3 px-10 border-none rounded-[0.4rem] font-bold cursor-pointer bg-white hover:bg-gray-200 m-4 md:m-0" onClick={(e)=>{handleUnits(e)}}>°F</button>
                    </div>
                    
                    <div className="slide-right  section section__temperature">
                        <div className="icons flex flex-col items-center  justify-center">
                        <h2 className=" text-base font-medium capitalize">{`${weather.name?`${weather.name}, `:"Not a vialid City."} ${weather.country?weather.country:""}`} </h2>
                        {
                            weather.iconURL?(
                            <img src={`${weather.iconURL}`} alt="weather_icon" className="w-20"/>
                            ):"No image"
                        }
                        <h2 className="capitalize">{`${weather.description?weather.description:"None"}`}</h2>
                        </div>
                        <div className="temperature  text-[40px] sm:text-[60px] font-medium">
                        {`${weather.temp?weather.temp:"Not found"} °${units==="metric"?"C":"F"}`}
                        </div>
                    </div>
                    <WeatherCard weather={weather} units={units}/>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
