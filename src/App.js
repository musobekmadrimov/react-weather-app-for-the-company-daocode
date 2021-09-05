import React, { useState } from "react";
import Geolocation from "./geolocation";
import RangeSlider from './RangeSlider';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
// import Zoom from '@material-ui/core/Zoom';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);




const api = {
    key: "1dac6e4f0758eccd4f9e3396b7adea43",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result)
                });
        }
    }

    const dateBuilder = d => {
        const currentDate = new Date();
        let day = currentDate.toLocaleString('default', { weekday: 'long' });
        let date = d.getDate();
        let month = currentDate.toLocaleString('default', { month: 'long' });
        let year = d.getFullYear();

        return `${day}, ${month} ${date}, ${year}`
    }


    return (
        <div className={
            (typeof weather.main != "undefined")
                ? ((weather.main.temp <= -10)
                    ? 'app cold'
                    : ((weather.main.temp > -10 && weather.main.temp < 30)
                        ? 'app warm'
                        : (weather.main.temp >= 30)
                            ? 'app hot'
                            : 'app'
                    )
                )

                : 'app'
        }>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ?
                    (<>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">{Math.round(weather.main.temp)}°C</div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                    </>)
                    : (
                        (weather.cod !== "") ? (
                            <>
                                <div className="weather-box">
                                    <div className="temp">{weather.cod}</div>
                                    <div className="weather">{weather.message}</div>
                                </div>
                            </>
                        ) : (
                            <></>
                        )

                    )}
                <LightTooltip title="I am sorry, I couldn't understand what to do with this slider!" arrow >
                    <div className="rangeSlider">
                        <RangeSlider />
                    </div>
                </LightTooltip >
                <Geolocation />
            </main>
        </div>
    );
}

export default App;