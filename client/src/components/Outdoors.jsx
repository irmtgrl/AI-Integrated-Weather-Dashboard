import outdoors from "../assets/outdoors.svg";

export function Outdoors({ temp, wind }) {
    let recommendation;
    if (temp >= 20 && wind < 10) {
        recommendation = "Highly Recommended"
    } else if (temp >= 12 && temp < 20 && wind < 15) {
        recommendation = "Recommended"
    } else if (temp < 12 || wind >= 15){
        recommendation = "Risky"
    } else {
        recommendation = "Not Recommended"
    }

    return (
        <div className="bento centered col-start-3 col-span-1 row-start-2 row-span-1">
            <h2>Outdoors</h2>
            <img className="my-2" src={ outdoors } />
            <p className="text-center leading-4">{ recommendation }</p>
        </div>
    )
}