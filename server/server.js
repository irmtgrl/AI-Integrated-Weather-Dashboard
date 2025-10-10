import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {Mistral} from "@mistralai/mistralai"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000
app.use(cors())

const weatherApiKey = process.env.OPENWEATHER_API_KEY
const mistralApiKey = process.env.MISTRAL_API_KEY

app.get("/api/weather/:city", async (req, res) => {
    const city = req.params.city
    try {
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`)
        if (!weatherRes.ok) return res.status(404).json({ error: "Something went wrong with finding the city." })
        const weatherData = await weatherRes.json()

        const usefulData = {
            description: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon,
            temperature: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            wind: weatherData.wind.speed,
            country: weatherData.sys.country,
            sunset: weatherData.sys.sunset,
            sunrise: weatherData.sys.sunrise,
        }
        const { description, temperature, humidity, wind } = usefulData
        const cityName = city.charAt(0).toUpperCase() + city.slice(1)

        const client = new Mistral({ apiKey: mistralApiKey })
        const aiRes = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: [
                {
                    role: "system",
                    content: "You give location and weather based recommendations of activities and what to wear. Keep it short, in three paragraphs approximately 250 words. Start by describing the weather in one sentence. Give breaks in between the paragraphs. Don't ask further questions and only use bold font when giving exact locations and headings."
                },
                {
                    role: "user",
                    content: `Weather description: ${description}, city: ${city} tempreature: ${temperature}°C, humidity: ${humidity}%, wind: ${wind}km/h`
                }
            ],
            temperature: 0.2
        })
        const aiRecommendation = await aiRes.choices[0].message.content

        res.json({
            ...usefulData,
            cityName,
            aiRecommendation
        })
    } catch (err) {
        console.error("Error fetching weather data: ", err)
        res.status(500).json({ error: "Server error.", details: err.message })
    }
})

app.listen(PORT, () => console.log(`Server active on port ${PORT}`))
