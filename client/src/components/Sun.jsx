import sunriseIcon from "../assets/sunriseIcon.svg";
import sunsetIcon from "../assets/sunsetIcon.svg";

export function Sun({ sunrise, sunset }) {
    const rise = new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const set = new Date(sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="bento flex gap-3 justify-center col-start-3 col-span-1 row-start-3 row-span-1">
            <div className="centered gap-1">
                <h2>Sunrise</h2>
                <img src={ sunriseIcon }/>
                <p>{rise}</p>
            </div>
            <div className="centered gap-1">
                <h2>Sunset</h2>
                <img src={ sunsetIcon }/>
                <p>{set}</p>
            </div>
        </div>
    )
}