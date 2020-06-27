const city = $("#city").val();
const currentCityDisplay = $(".cityName");
const currentDateDisplay = $(".date");
const weatherIcon = $("#todayWeatherIcon");
const temperature = $(".temperature");
const humidity = $(".humidity");
const windSpeed = $(".windSpeed");
const uvIndex = $(".uvIndex");

// const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + "london" + "&appid=17eb3367ba18dce2a0f91e80d65b735b";

// $("button").on("submit", function (event) {
//   event.preventDefault();
const apiKey = "17eb3367ba18dce2a0f91e80d65b735b";
$.ajax({
  url: `http://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}`,
  method: "GET",
}).then(function (response) {
  console.log(response);
  console.log(response.weather[0].icon);
  console.log(response.dt);

  const date = moment.unix(response.dt).format("L");
  currentDateDisplay.text(date);

  currentCityDisplay.text(response.name);
  weatherIcon.attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
  temperature.text(response.main.temp);
  humidity.text(response.main.humidity);
  windSpeed.text(response.wind.speed);

  const latitude = response.coord.lat;
  const longitude = response.coord.lon;
  const uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${latitude}&lon=${longitude}`;
  $.ajax({
    url: uvURL,
    method: "GET",
  }).then(function (response) {
    uvIndex.text(response.value);
  });
});


// });
