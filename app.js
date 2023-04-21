const app = {};

app.apiKey = "273da19803c78dcc36cee2c53a5b7520";

//Load data from API when submit button is clicked
app.handleOnFormSubmit = () => {
  const $searchForm = $("#search-form");

  $searchForm.submit(function (e) {
    e.preventDefault();

    const $cityInput = $("#city");
    const city = $cityInput.val();

    app.getWeatherInfoDetails(city);
  });
};

//Get weather information from the API
app.getWeatherInfoDetails = (city) => {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${app.apiKey}`,
    method: "GET",
    dataType: "json",
  })
    .then((res) => {
      app.renderWeatherInfo(res);
      app.displayOutfitInfo(res);
      // app.getCurrentTime(res);
    })
    .catch((xhr, status, error) => {
      alert(`Error: ${error}`);
    });
};

app.getCurrentMonth = () => {
  const date = new Date();
  const currentMonthNum = date.getMonth();

  return currentMonthNum;
};

//get current time info from timezone offset data
app.getCurrentTime = (timezone) => {
  const timezoneOffset = timezone;
  console.log(timezoneOffset);

  const now = new Date();
  const utcTimestamp = now.getTime() + 4 * 60 * 60 * 1000;
  const timezoneTimestamp = utcTimestamp + timezoneOffset * 1000;

  const timezoneDateNew = new Date(timezoneTimestamp);
  const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedTime = timezoneDateNew.toLocaleTimeString("en-US", options);

  return formattedTime;
};

//Fetch data in weather-info section
app.renderWeatherInfo = (data) => {
  console.log(data);
  // console.log(data.timezone);

  const $weatherInfo = $("#weather-info");
  const cityName = data.name;
  const currentTime = app.getCurrentTime(data.timezone);
  const description = data.weather[0].description;
  const temp = Math.round(data.main.temp); //omit number under the decimal point
  const feel_like_temp = Math.round(data.main.feels_like); //omit number under the decimal point
  const windSpeed = Math.round(data.wind.speed); //omit number under the decimal point

  // const currentTime = data.

  const descriptionCap =
    data.weather[0].description.charAt(0).toUpperCase() +
    data.weather[0].description.slice(1);

  $weatherInfo.empty();

  // Insert weather information and current time into #weather-info sections
  $("<h1>").text(cityName).appendTo($weatherInfo);
  $("<p>")
    .text(`Now ${currentTime}`)
    .appendTo($weatherInfo)
    .css("color", "gray");
  $("<h3>").text(descriptionCap).appendTo($weatherInfo).css("color", "#231942");
  $("<h3>").text(`Temperature: ${temp}°C`).appendTo($weatherInfo);
  $("<p>").text(`Feels like: ${feel_like_temp}°C`).appendTo($weatherInfo);
  $("<p>").text(`Wind speed: ${windSpeed} m/s`).appendTo($weatherInfo);
};

//Fetch outfit image in #outfits section
app.displayOutfitInfo = (data) => {
  const monthForOutfit = app.getCurrentMonth(); //Jan = 0 ~ Dec = 11
  const descriptionForOutfit = data.weather[0].main; //Rain or Snow
  const tempForOutfit = data.main.temp;

  const $outfits = $("#outfits");
  $outfits.empty();

  let imageSrc = "";

  switch (descriptionForOutfit) {
    case "Rain":
      imageSrc =
        monthForOutfit >= 5 && monthForOutfit <= 7
          ? "assets/images/rainSummer.png"
          : "assets/images/rainSpringFall.png";
      break;
    case "Snow":
      imageSrc = "assets/images/snow.png";
      break;
    default:
      if (tempForOutfit >= 30) {
        imageSrc = "assets/images/superHot.png";
      } else if (tempForOutfit >= 25) {
        imageSrc = "assets/images/hot.png";
      } else if (tempForOutfit >= 20) {
        imageSrc = "assets/images/warm.png";
      } else if (tempForOutfit >= 15) {
        imageSrc = "assets/images/mild.png";
      } else if (tempForOutfit >= 10) {
        imageSrc = "assets/images/cool.png";
      } else if (tempForOutfit >= 0) {
        imageSrc = "assets/images/cold.png";
      } else {
        imageSrc = "assets/images/freezing.png";
      }
  }

  $outfits.attr("src", imageSrc);
};

app.init = () => {
  app.handleOnFormSubmit();
};

//start of doc.ready
$(() => {
  app.init();
}); //end of doc.ready

//footer
$("footer").html(
  `<a href= https://junocollege.com/ target = "_blank">&copy;Inho Choi  |  Created @ Juno College</a>`
);
