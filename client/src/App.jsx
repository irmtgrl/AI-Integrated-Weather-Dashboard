import { useState, useEffect, useRef } from 'react'
import { gsap } from "gsap"
import './App.css'
import { Greeting } from './components/Greeting.jsx'
import { Weather } from './components/Weather.jsx'
import { Outdoors } from './components/Outdoors.jsx'
import { Sun } from './components/Sun.jsx'
import { Weekly } from './components/Weekly.jsx'
import { Widget } from './components/Widget.jsx'

function App() {
  const [loading, setLoading] = useState(false)
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  const inputRef = useRef(null)
  const loadingRef = useRef(null)

  useEffect(()=>{
    if(loading) {
      gsap.to(loadingRef.current, {
        opacity: 1,
        duration: 0.6,
        repeat: -1,
        repeatDelay: 0.3,
        yoyo: true,
        ease: "power1.inOut"
      })
    } else {
      gsap.killTweensOf(loadingRef.current)
      gsap.to(loadingRef.current, { opacity: 0, duration: 0.3 })
    }
  }, [loading])

    async function getRecommendation (event) {
      event.preventDefault()

      const location = inputRef.current.value
      if(!location) return
      setLoading(true)

      try{
        const weatherRes = await fetch(`https://weather-dashboard-by-irem.onrender.com/api/weather/${location}`)
        if(!weatherRes.ok) {
          setError({
            code: 404,
            content: "Can not find city, please enter a valid city name and try again."
          })
          return
        }
        const fetchedData = await weatherRes.json()
        setWeatherData(fetchedData)
        setError(null)
      } catch (err) {
        setError({
            code: 500,
            content: "AI request failed. Try again."
        })
        console.error("AI request failed:", err);
      } finally {
        setLoading(false)
      }
    }

    function changeCity() {
      setWeatherData(null)
    }

  return (
    <>
      {!weatherData && 
      <header className="bg-beige/30 rounded-lg px-6 py-4">
        <h1 className="max-w-md leading-12 mb-4 text-brunette">AI POWERED WEATHER REPORTS</h1>
        <p className="max-w-lg mb-4 text-brunette text-lg">This app makes weather reports more engaging through visuals and smart, weather-based recommendations.</p>
        <form onSubmit={getRecommendation}>
          <input ref={inputRef} type="text" className="mb-2 focus:outline-none bg-beige/30 focus:bg-beige/60 rounded-md w-1/2" placeholder="Enter location"></input>
        </form>
        <p className="text-sm text-brunette">Powered By Mistral</p>
      </header>
      }

      <div 
      ref={loadingRef}
      className="text-brunette/80"
      style={{
        opacity: 0,
        marginTop: 8
      }}
      >
        ✨ Thinking...
      </div>

      {weatherData && <main>
        <div className="
          relative inline-flex flex-col gap-2
          md:grid md:grid-cols-5 md:grid-rows-3
          2xl:w-[800px] 2xl:h-[400px] md:w-[600px] sm:w-[400px]
          2xl:gap-4 xl:gap-2 md:gap-2
        ">
          <Greeting 
            aiRecommendation={weatherData?.aiRecommendation ?? ""}
          /> 
          <Weather 
            temp={weatherData?.temperature ?? "--"}
            name={weatherData?.cityName ?? "Loading..."}
            country={weatherData?.country ?? "--"}
            description={weatherData?.description ?? "--"}
            icon={weatherData?.icon ?? "--"}
            wind={weatherData?.wind ?? "--"}
            humidity={weatherData?.humidity ?? "--"}
          />
          <Outdoors 
            temp={weatherData?.temperature ?? "--"}
            wind={weatherData?.wind ?? "--"}
          />
          <Sun
            sunrise={weatherData?.sunrise ?? "--"}
            sunset={weatherData?.sunset ?? "--"}
          />
          <Weekly 
            temp={weatherData?.temperature ?? "--"}
            icon={ weatherData?.icon ?? "--"}
          />
        </div>

      {weatherData && <Widget 
        temp={weatherData?.temperature ?? "--"}
        name={weatherData?.cityName ?? "Loading..."}
        icon={weatherData?.icon ?? "--"}
        onClick={ () => changeCity() }
      />}
      </main>}
      
      
      {error && <div className="bento w-800px">
        <h1>{error.code}</h1>
        <p>{error.content}</p>
      </div>}
    </>
  )
}

export default App
