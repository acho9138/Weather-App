const city = $("#city").val();
const currentCityDisplay = $(".cityName");
const currentDateDisplay = $(".date");
const weatherIcon = $("#todayWeatherIcon");
const temperature = $(".temperature");
const humidity = $(".humidity");
const windSpeed = $(".windSpeed");
const uvIndex = $(".uvIndex");
const forecast = $(".forecastCard")

// const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + "london" + "&appid=17eb3367ba18dce2a0f91e80d65b735b";

// $("button").on("submit", function (event) {
//   event.preventDefault();
const apiKey = "17eb3367ba18dce2a0f91e80d65b735b";
// Call current weather details
$.ajax({
  url: `http://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}`,
  method: "GET",
}).then(function (response) {
  // Display current date using epoch time from array
  const date = moment.unix(response.dt).format("L");
  currentDateDisplay.text(date);
  // Display weather details on main div
  currentCityDisplay.text(response.name);
  weatherIcon.attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
  temperature.text(response.main.temp);
  humidity.text(response.main.humidity);
  windSpeed.text(response.wind.speed);
  // Get lat and lon for selected city
  const latitude = response.coord.lat;
  const longitude = response.coord.lon;
  // Call api to retrieve UV index using lat and lon coordinates
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${latitude}&lon=${longitude}`,
    method: "GET",
  }).then(function (response) {
    const uv = response.value;
    uvIndex.text(uv);
    // Colour code UV index according to value
    if (uv <= 2) {
      uvIndex.addClass("light-green accent-3");
    } else if (uv >= 8) {
      uvIndex.addClass("red accent-3");
    } else {
      uvIndex.addClass("amber accent-3");
    }
  });

  // Call forecasted weather details for the next 5 days
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${apiKey}`,
    method: "GET",
  }).then(function (response) {
    // Array containing forcasted 5 days of weather
    const forecastArray = response.daily.slice(0, 5);

    // Create new card for each day
    for(const currentWeather of forecastArray) {
      let newDiv = $("<div>");
      newDiv.addClass("col s12 m2");
      let newCard = $('<div>');
      newDiv.addClass("card-panel teal");
      // Add weather details to each card
      let forecastDate = moment.unix(currentWeather.dt).format("L");
      let forecastIcon = currentWeather.weather[0].icon
      newCard.html(`<h6>${forecastDate}</h6>`);
      newCard.append(`<img src="http://openweathermap.org/img/w/${forecastIcon}.png" alt="weather icon">`);
      newCard.append(`<p>Temp: ${currentWeather.temp.day}<sup>o</sup>F</p>`);
      newCard.append(`<p>Humidity: ${currentWeather.humidity}%</p>`);
      newDiv.append(newCard)
      forecast.append(newDiv);
    }
  });
});



// });
