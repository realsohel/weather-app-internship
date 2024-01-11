const API_KEY = "82cc218063ba0f63f528f0e8effd065f";

const makeIcon = (icon)=> `https://openweathermap.org/img/wn/${icon}@2x.png`


const getFormattedData= async(city, units= 'metric')=>{
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    try {
        const data = await fetch(URL)
        .then((res)=>res.json()).then((data)=>data);
    console.log(data)
    const{
        cod,
        weather,
        main:{
            temp_min, temp_max, feels_like, humidity, temp, pressure},
        sys:{country},
        wind:{speed},
        name,
    } = data;

    const {description, icon } = weather[0];
    
    return {
        cod,
        description,
        iconURL: makeIcon(icon),
        temp,
        feels_like,
        temp_max,
        temp_min,
        pressure,
        humidity,
        speed,
        country,
        name,
    }
    } 
    catch (error) {
        const {cod,message} = error;
        console.log(`COD: ${cod} and msg: ${message}`)
        return {
            cod,
            message
        };
    }

    
    
}

export  {getFormattedData};