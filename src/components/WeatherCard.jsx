import React from 'react'
import "../assets/descriptions.css"
import {FaArrowDown, FaArrowUp, FaWind} from 'react-icons/fa';
import {BiHappy} from 'react-icons/bi';
import {MdCompress, MdOutlineWaterDrop} from 'react-icons/md'

const WeatherCard = (props) => {

    const tempUnit = props.units === 'metric'?'°C':'°F';
    const windUnit = props.units === 'metric'?'m/s':'m/h';

    const cards = [
        {
            id:1,
            icon: <FaArrowDown />,
            title:'Min',
            data: props.weather.temp_min,
            unit: tempUnit,
        },
        {
            id:2,
            icon: <FaArrowUp />,
            title:'Max',
            data: props.weather.temp_max,
            unit: tempUnit,
        },
        {
            id:3,
            icon: <BiHappy />,
            title:'feels like',
            data: props.weather.feels_like,
            unit: tempUnit,
        },
        {
            id:4,
            icon: <MdCompress />,
            title:'pressure',
            data: props.weather.pressure,
            unit: "hPa",
        },
        
        {
            id:5,
            icon: <MdOutlineWaterDrop />,
            title:'humidity',
            data: props.weather.humidity,
            unit: "%",
        },
        
        {
            id:6,
            icon: <FaWind />,
            title:'wind speed',
            data: props.weather.speed,
            unit: windUnit,
        },
    ]
    return (
        <>
        <div className="fade-in section sectioon__descriptions grid  grid-cols-3 gap-10 mt-20 text-lg font-medium">
        {cards.map(({id,icon,title,data,unit}) =>(

            <div key={id}className="card flex flex-col items-center justify-between p-4 rounded-[0.4rem] slide-up">
                <div className="description__card-icon w-[100%] flex flex-row items-center justify-center gap-1 mt-2 mb-10 md:mb-4 ">
                    {icon}
                    <small className='capitalize'>{title}</small>
                </div>
                <h2>{`${data?data:"Not Found"} ${unit}`}</h2>
            </div>
        ))}
            
        </div>
        </>
    )
}

export default WeatherCard
