// import { useState } from "react"
// import { Sun, CloudRain, Wind, Droplet, GlassWater, Search } from "lucide-react";
// import axios from "axios";

// const popularCities = [
//   "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad",
//   "Chennai", "Kolkata", "Pune", "Jaipur", "Surat",
//   "Lucknow", "Kanpur", "Nagpur", "Indore", "Bhopal",
//   "Patna", "Vadodara", "Ludhiana", "Agra", "Nashik",
//   "Faridabad", "Meerut", "Rajkot", "Varanasi", "Amritsar",
//   "Ranchi", "Guwahati", "Chandigarh", "Coimbatore", "Vijayawada",
//   "Mysuru", "Thiruvananthapuram", "Jodhpur", "Madurai", "Noida",
//   "Gwalior", "Visakhapatnam", "Raipur", "Jamshedpur", "Dehradun",
//   "Udaipur","Shimla", "Mangalore", "Allahabad", "Tiruchirappalli"
// ];

// const App = () => {

//   const key = import.meta.env.VITE_KEY
//   const [suggestion,setSuggestion] = useState([])
//   const [city, setCity] = useState('')
//   const [weatherData,setWeatherData] = useState(null)

//   const handleSearchChange = (e)=>{
//     const value = e.target.value;
//     setCity(value);
//     if(value.length>0){
//       const matches = popularCities.filter((c)=>
//         c.toLowerCase().startsWith(value.toLowerCase())
//       ).slice(0,8);
//       setSuggestion(matches);
//     }else{
//       setSuggestion([]);
//     }
//   }

//   const getweatherData = async(cityName = city)=>{

//     if(typeof cityName !== "string") return;

//     const selectedCity = popularCities.find(
//       (c)=>c.toLowerCase() === cityName.toLowerCase()
//     );

//     if(!selectedCity){
//       alert("please select a valid city from suggestion");
//       return;
//     }

//     try{
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${key}`
//       );

//       setWeatherData(response.data);
//       console.log(response.data);

//       setCity('')
//       setSuggestion([])

//     }catch(error){
//       console.log(error);
//     }
//   }

//   const handleSuggetionClick=(suggestion)=>{
//     setCity(suggestion)
//     getweatherData(suggestion)
//   }

//   const getWeatherIcon = (main) => {
//     switch (main) {
//       case "Clear":
//         return <Sun size={80} strokeWidth={1.5} />;
//       case "Clouds":
//       case "Rain":
//       case "Drizzle":
//         return <CloudRain size={80} strokeWidth={1.5} />;
//       case "Snow":
//         return <CloudRain className="rotate-45" size={80} strokeWidth={1.5} />;
//       case "Thunderstorm":
//         return <CloudRain className="animate-pulse" size={80} strokeWidth={1.5} />;
//       case "Mist":
//       case "Fog":
//         return <Wind size={80} strokeWidth={1.5} />;
//       default:
//         return <CloudRain size={80} strokeWidth={1.5} />;
//     }
//   };

//   return (
//     <div className='relative flex justify-center items-center px-4 min-h-screen bg-weather-gradient'>
//       <div className='max-w-5xl w-full shadow-2xl p-8 bg-weather-gradient backdrop-blur-sm rounded-2xl space-y-6 border-white/20'>
        
//         {/* header */}
//         <div className='flex flex-col md:flex-row justify-between items-center gap-4 relative'>
//           <h1 className='font-bold text-4xl text-white tracking-wide'>
//             WeatherNow
//           </h1>

//           <div className='w-full md:w-auto relative'>
//             <div className='flex items-center space-x-3'>
//               <input
//                 type='text'
//                 placeholder='Enter a city'
//                 value={city}
//                 onChange={handleSearchChange}
//                 className='px-4 py-2 w-full bg-white/20 placeholder-white text-white border-2 border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300'
//               />

//               <button className='p-3 cursor-pointer' onClick={()=>getweatherData()}>
//                 <Search className='text-white' size={28}/>
//               </button>
//             </div>

//             {/* suggestions */}
//             {suggestion.length>0 &&
//               <ul className="absolute z-10 w-full bg-white text-black mt-2 rounded-xl overflow-hidden shadow-md max-w-48 overflow-y-auto">
//                 {suggestion.map((s,index)=>(
//                   <li
//                     className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
//                     key={index}
//                     onClick={()=>handleSuggetionClick(s)}
//                   >
//                     {s}
//                   </li>
//                 ))}
//               </ul>
//             }
//           </div>
//         </div>

//         {/* weather display */}
//         {weatherData && (
//         <div className='flex flex-col md:flex-row justify-between items-center bg-weather-gradient backdrop-blur-sm rounded-xl p-6 shadow-xl sapce-y-4 md:sapce-y-0'>
//           <div className='space-y-2 text-center md:text-left'>
//             <div className='flex items-start justify-center md:justify-start space-x-2'>
//               <h2 className='text-7xl md:text-8xl text-white font-bold'>
//                 {Math.round(weatherData.main.temp-273.15)}
//               </h2>
//               <span className='text-3xl md:text-5xl text-white'>°C</span>
//             </div>

//             <h3 className='text-white text-xl md:text-2xl font-medium'>
//               {weatherData.name}, {weatherData.sys.country}
//             </h3>

//             <h4 className='text-white text-lg md:text-xl capitalize'>
//               {weatherData.weather[0]?.description}
//             </h4>
//           </div>

//           <div className="text-white">
//             {getWeatherIcon(weatherData.weather[0]?.main)}
//           </div>
//         </div>
//         )}

//         {/* info boxes */}
//         {weatherData && (
//         <div className='grid grid-col-2 md:grid-cols-4 gap-4 text-white'>
//           <WeatherBox icon={<Droplet size={32} />} title={"Humidity"} value={`${weatherData.main.humidity}%`} />
//           <WeatherBox icon={<GlassWater size={32} />} title={"Pressure"} value={`${weatherData.main.pressure} hPa`} />
//           <WeatherBox icon={<Wind size={32} />} title={"Wind Speed"} value={`${Math.round(weatherData.wind.speed*3.6)} km/h`} />
//           <WeatherBox icon={<Sun size={32} />} title={"FeelsLike"} value={`${Math.round(weatherData.main.feels_like-273.15)}°C`} />
//         </div>
//         )}

//       </div>
//     </div>
//   )
// }

// const WeatherBox = ({icon ,title , value})=>{
//   return (
//     <div className='backdrop-blur-sm rounded-2xl p-4 shadow-xl flex flex-col items-center space-y-2 border-white/20 hover:scale-105 transition-transform'>
//       <div className='text-white'>{icon}</div>
//       <h3 className='text-lg font-semibold'>{title}</h3>
//       <p className='text-xl font-bold'>{value}</p>
//     </div>
//   )
// }

// export default App




import { useState } from "react"
import { Sun, CloudRain, Wind, Droplet, GlassWater, Search } from "lucide-react";
import axios from "axios";

const App = () => {

  const key = import.meta.env.VITE_KEY
  const [city, setCity] = useState('')
  const [weatherData,setWeatherData] = useState(null)
  const [location,setLocation] = useState(null)   // 👈 store state info
const getweatherData = async(cityName = city)=>{

  if(!cityName || cityName.trim()===""){
    alert("Please enter a place name");
    return;
  }

  try{

    // 🔥 split user input into parts
    const parts = cityName.split(" ").filter(Boolean);

    let query = "";

    if(parts.length === 1){
      // only place
      query = `${parts[0]},IN`;
    }else{
      // place + state
      const place = parts[0];
      const state = parts.slice(1).join(" ");
      query = `${place},${state},IN`;
    }

    // 1️⃣ geocode
    const geoRes = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${key}`
    );

    if(!geoRes.data.length){
      alert("Location not found");
      return;
    }

    const geo = geoRes.data[0];

    setLocation({
      name: geo.name,
      state: geo.state,
      country: geo.country
    });

    // 2️⃣ weather from lat lon
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${geo.lat}&lon=${geo.lon}&appid=${key}`
    );

    setWeatherData(weatherRes.data);
    setCity('');

  }catch(error){
    alert("Location search failed");
    console.log(error);
  }
}


  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return <Sun size={80} strokeWidth={1.5} />;
      case "Clouds":
      case "Rain":
      case "Drizzle":
        return <CloudRain size={80} strokeWidth={1.5} />;
      case "Snow":
        return <CloudRain className="rotate-45" size={80} strokeWidth={1.5} />;
      case "Thunderstorm":
        return <CloudRain className="animate-pulse" size={80} strokeWidth={1.5} />;
      case "Mist":
      case "Fog":
        return <Wind size={80} strokeWidth={1.5} />;
      default:
        return <CloudRain size={80} strokeWidth={1.5} />;
    }
  };

return (
  <div className='min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 bg-weather-gradient'>
    
    <div className='w-full max-w-6xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl p-5 sm:p-8 lg:p-10 space-y-6'>

      {/* HEADER */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-5'>
        
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide text-center md:text-left'>
          WeatherNow
        </h1>

        <div className='flex w-full md:w-auto items-center gap-3'>
          <input
            type='text'
            placeholder='Search any area in India'
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            onKeyDown={(e)=>{ if(e.key==="Enter") getweatherData() }}
            className='w-full md:w-72 lg:w-80 px-4 py-2.5 bg-white/20 text-white placeholder-white/80 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 transition'
          />

          <button className='p-3 bg-white/20 hover:bg-white/30 rounded-xl transition' onClick={()=>getweatherData()}>
            <Search className='text-white' size={22}/>
          </button>
        </div>

      </div>

      {/* WEATHER CARD */}
      {weatherData && location && (
      <div className='flex flex-col lg:flex-row items-center justify-between gap-6 bg-gradient-to-br from-white/20 to-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl'>

        <div className='text-center lg:text-left space-y-2'>
          
          <div className='flex items-start justify-center lg:justify-start gap-2'>
            <h2 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-white'>
              {Math.round(weatherData.main.temp-273.15)}
            </h2>
            <span className='text-2xl sm:text-3xl lg:text-4xl text-white mt-1'>°C</span>
          </div>

          <h3 className='text-white text-lg sm:text-xl lg:text-2xl font-medium'>
            {location.name}, {location.state}, {location.country}
          </h3>

          <h4 className='text-white/90 text-base sm:text-lg capitalize'>
            {weatherData.weather[0]?.description}
          </h4>

        </div>

        <div className='text-white scale-90 sm:scale-100'>
          {getWeatherIcon(weatherData.weather[0]?.main)}
        </div>

      </div>
      )}

      {/* INFO GRID */}
      {weatherData && (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6'>

        <WeatherBox icon={<Droplet size={28} />} title={"Humidity"} value={`${weatherData.main.humidity}%`} />
        <WeatherBox icon={<GlassWater size={28} />} title={"Pressure"} value={`${weatherData.main.pressure} hPa`} />
        <WeatherBox icon={<Wind size={28} />} title={"Wind Speed"} value={`${Math.round(weatherData.wind.speed*3.6)} km/h`} />
        <WeatherBox icon={<Sun size={28} />} title={"FeelsLike"} value={`${Math.round(weatherData.main.feels_like-273.15)}°C`} />

      </div>
      )}

    </div>
  </div>
)

}

const WeatherBox = ({icon ,title , value})=>{
  return (
    <div className='bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center text-center gap-2 shadow-lg hover:scale-105 hover:bg-white/20 transition duration-300'>
      <div className='text-white'>{icon}</div>
      <h3 className='text-white text-sm sm:text-base font-semibold'>{title}</h3>
      <p className='text-white text-lg sm:text-xl font-bold'>{value}</p>
    </div>
  )
}


export default App

