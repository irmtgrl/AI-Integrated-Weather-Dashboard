export function Weekly({ temp, icon }) {
    const date = new Date()
    const getDay = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday", 
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
    }

  const fixedDate = (add = 0) => {
    const nextDayIndex = (date.getDay() + add) % 7;
    return getDay[nextDayIndex];
  };

    return (
        <div className="bento flex flex-col justify-center items-center col-start-4 col-span-2 row-start-1 row-span-3">
            {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full flex items-center justify-start gap-1">
                <img src={`https://openweathermap.org/img/wn/${icon}.png`} />
                <h2 className="mr-auto">{fixedDate(i)}</h2>
                <h2>{temp}°C</h2>
                </div>
            ))}
        </div>
    )
}