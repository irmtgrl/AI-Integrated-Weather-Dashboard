export function Weather({ temp, name, country, description, icon, wind, humidity }) {
    return (
        <div className="bento centered col-start-1 col-span-2 row-start-2 row-span-2">
            <img src={`https://openweathermap.org/img/wn/${ icon }@2x.png`}/>
            <h2>{ name }, { country }</h2>
            <p>{ description }</p>
            <h1 className="text-brunette">{ temp }<span className="text-[0.5em]">°C</span></h1>
            <div className="flex justify-between w-full">
                <p>Humidity: <span>{ humidity }%</span> </p>
                <p>Wind: <span>{ wind }km/h</span></p>
            </div>
        </div>
    )
}