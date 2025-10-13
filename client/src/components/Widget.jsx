export function Widget({ temp, name, icon, onClick }) {
    return (
        <div className="fixed top-4 right-4 opacity-0 md:opacity-100">
            <div className="bento w-full h-full flex justify-start items-center">
                <img src={`https://openweathermap.org/img/wn/${ icon }.png`}/>
                <h2 className="mr-6">{ name }</h2>
                <h2 className="mr-4">{ temp }°C</h2>
            </div>
            <div onClick={ onClick } className="bento flex justify-center mt-2 opacity-40 hover:opacity-100 hover:cursor-pointer transition duration-300">
                <p>Change Location</p>
            </div>
        </div>
    )
}