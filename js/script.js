

//working//
const apiKey ='9ae8b63abc268f0a06d9313a20a30cc0'


const cityInput = document.querySelector('.city-input'); // Fixed typo in class name
const searchBtn = document.querySelector('.search-btn'); // Removed extra space

//working//


//working//
const weatherInfoSection = document.querySelector('.weather-info')
const notFoundSection = document.querySelector('.not-found')
const searchCitySection = document.querySelector('.search-city ')

//working//

//working//
const countryTxt = document.querySelector('.country-txt')
const tempTxt = document.querySelector('.temp-txt')
const conditionTxt = document.querySelector('.condition-txt')
const humidityValueTxt = document.querySelector('.humidity-value-txt')
const windValueTxt = document.querySelector('.wind-value-txt')
const weathearSummeryTxt = document.querySelector('.weathear-summery')
const CurrentDateTxt = document.querySelector('.current-date-txt')


console.log(countryTxt);
console.log( tempTxt);
console.log(conditionTxt);
console.log(humidityValueTxt);
console.log(windValueTxt);
console.log(weathearSummeryTxt);
console.log(CurrentDateTxt);


//working//


const forecastItemsContainer = document.querySelector('.forecast-item-container')

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') { // Fixed comparison operator
       updateWeatherInfo(cityInput.value)
        cityInput.value = ''; // Added semicolon
        cityInput.blur(); // Added semicolon

        console.log(cityInput);
        
    }

    console.log(searchBtn);
    
});

//working//


//working//
cityInput.addEventListener('keydown', (event) => {
    
    if(event.key == 'enter' &&

        cityInput.value.trim() !=''

    )
    {

        updateWeatherInfo(cityInput.value)
        cityInput.value = ''; 
        cityInput.blur(); 

    }
    
    console.log(event);
    
    
    });

    //working//

//async-fetch//
  //working//

async function getFetchData(endPoint , city){


const apiUrl =`https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`

const response =await fetch(apiUrl)

return response.json()

}

  //working//


  function getWeatherIcon(id) {

console.log(id);



    if (id >= 200 && id < 300) {  // Thunderstorm
        return "thunderstorms-overcast.svg";
    } else if (id >= 300 && id < 400) {  // Drizzle
        return "overcast.svg";
    } else if (id >= 500 && id < 600) {  // Rain
        return "rain.svg";
    } else if (id >= 600 && id < 700) {  // Snow
        return "snow.svg";
    } else if (id >= 700 && id < 800) {  // Atmospheric (e.g., mist, fog)
        return "fog.svg";  // Update this to a relevant icon
    } else if (id === 800) {  // Clear sky
        return "clear-day.svg";  // Use appropriate icon for clear sky
    } else if (id >= 801 && id < 900) {  // Clouds
        return "cloudy.svg";
    } else {  // Default case (e.g., mist, etc.)
        return "default.svg";
    }
}



function  getCurrentDate() {

    const  CurrentDate = new Date()

    const options ={
        weekday: 'short', 
        day: '2-digit', 
        month: 'short'}


    console.log( CurrentDate);
    
   return CurrentDate.toLocaleDateString('en-GB', options)

}





//!//

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);

    // Check if the weather data is valid
    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection);
        return;
    }

    // Destructure the weather data here after validation
    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData; // You were using "weather" here, but it should be "weatherData"

    // Now you can use the destructured variables
    console.log(country, temp, humidity, main, speed);

    // Update the country text content in the UI
    countryTxt.textContent = country;
    tempTxt.textContent = Math.round (temp) +'°C'
    conditionTxt.textContent =  main;
    humidityValueTxt.textContent = humidity + '%';
    windValueTxt.textContent = speed + 'm/s' ;
    weathearSummeryTxt.src= `media/${getWeatherIcon(id)}`;
    CurrentDateTxt.textContent =  getCurrentDate();


    await updateForecastsInfo(city)





    // Show the weather info section
    showDisplaySection(weatherInfoSection);
}


async function  updateForecastsInfo(city){//

const forecastsData = await getFetchData('forecast' , city)

const timeTaken = '12:00:00'

const todayDate = new Date ().toISOString().split('T')[0]

//
forecastItemsContainer.innerHTML = ''
//


forecastsData.list.forEach(forecastWeather => {//
    
    if(forecastWeather.dt_txt.includes(timeTaken) && !forecastWeather.dt_txt.includes(todayDate)) {
        updateForecastItems(forecastWeather)
        console.log(forecastWeather);
    }
    
})//



function updateForecastItems(weatherData){

console.log(weatherData);
 const {
dt_txt : date ,
weather :[{ id }],
main : {temp}

 } = weatherData;

const forecastItem =`

<div class="forcast-item">
<h5 class="forcast-item-data">05 Aug</h5>
<img src="./media/${getWeatherIcon( id )}" alt="" class="forecast-item-img">
<h5 class="forecast-item-temp">${Math.round(temp)}°C</h5>
  </div>

`
forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem)
}





}//




function showDisplaySection (section){

    [weatherInfoSection , searchCitySection, notFoundSection]

    .forEach( section => section.style.display ='none')

    section.style.display = 'grid'

}
