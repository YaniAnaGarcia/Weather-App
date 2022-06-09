import React, {useState} from "react";
import axios from 'axios';



function App(){

    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const apiKey = '0ec87971caa24230d3928394802306a3'
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    
    const searchLocation = (e) => {
        if(e.key === 'Enter'){
            axios.get(URL).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('')
        }
    }

    const handleChangeLocation = (event) => {
        setLocation(event.target.value)
    }

    return(
        <div className="app">
            <div className="search">
                <input
                    placeholder='Enter Location...'
                    value={location}
                    onChange={handleChangeLocation} 
                    onKeyPress={searchLocation}
                    type="text" 
                />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {
                            data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null
                        }
                    </div>
                    <div className="description">
                        {
                            data.weather ? <p>{data.weather[0].main}</p> : null
                        }
                    </div>
                </div>
                {/* bottom */}
                {data.name !== undefined && 
                    <div className="bottom">
                        <div className="feels">
                            {
                                data.main ? <p>{data.main.feels_like.toFixed()}° C</p> : null
                            }
                         <p className="bold"> Feels Like</p>
                        </div>
                        <div className="humidity">
                            {
                                data.main ? <p>{data.main.humidity}%</p> : null
                            }
                            <p className="bold">Humidity</p> 
                        </div>
                        <div className="wind">
                            {
                                data.wind?  <p>{data.wind.speed.toFixed()} Km/H</p> : null
                            }
                            <p className="bold">Winds</p>
                        </div>
                    </div>
                }
               


            </div>
        </div>
    )
}

export default App