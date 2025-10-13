import Markdown from "react-markdown"
import { useState } from "react";

export function Greeting({ aiRecommendation }) {
    const [ expanded, setExpanded ] = useState(false)
    const hour = new Date().getHours();
    let greeting;

    if (hour < 4) greeting = "Good Night";
    else if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";
    else if (hour < 22) greeting = "Good Evening";
    else greeting = "Good Night";

    return (
    <div 
    onClick={() => setExpanded(prev => !prev)}
    className="bento group relative overflow-hidden flex flex-col justify-start 
    row-start-1 row-span-1 col-start-1 col-span-3 
    transition-all duration-600
    hover:justify-center
    hover:absolute hover:top-0 hover:left-0 hover:z-20
    hover:2xl:w-[800px] hover:2xl:h-[400px]
    hover:md:w-[600px] hover:w-full
    shrink-0 hover:max-h-[450px]
    hover:shadow-2xl
    ">
      <h2 className="mb-2">{greeting}, <span className={`group-hover:opacity-0 ${expanded ? "opacity-0" : "opacity-100"}`}>hover for recommendations!</span></h2>

      <div className="text-black 
      line-clamp-3 sm:line-clamp-3  
      hover:w-full group-hover:line-clamp-none group-hover:overflow-scroll
      hover:max-h-[600px] transition-all duration-600
      ">
        <Markdown>{aiRecommendation}</Markdown>
      </div>

      <div className={`absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-beige to-transparent pointer-events-none transition-opacity duration-300 ${expanded ? "opacity-0" : "opacity-100"}`}/>
    </div>
    )
}

//See if onlick working on mobile view. Also check again the transitions.