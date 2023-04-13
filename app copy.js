const app = {};

app.apiKey = "273da19803c78dcc36cee2c53a5b7520";

//Load data from API when submit button is clicked
app.handleOnFormSubmit = () => {
  $("#search-form").submit(function (e) {
    e.preventDefault();

    const city = $("#city").val();

    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${app.apiKey}`,
      method: "GET",
      dataType: "json",
    })
      .then((data) => {
        app.displayWeatherInfo(data);
        app.displayOutfitInfo(data);
      })
      .catch((xhr, status, error) => {
        alert(`Error: ${error}`);
      });
  });
};

app.getCurrentMonth = () => {
  const date = new Date();

  const currentMonthNum = date.getMonth();

  return currentMonthNum;
};

//Fetch data in weather-info section
app.displayWeatherInfo = (data) => {
  // console.log(data);

  const weatherInfo = $("#weather-info");
  const cityName = data.name;
  const description = data.weather[0].description;
  const temp = Math.round(data.main.temp); //omit number under the decimal point
  const feel_like_temp = Math.round(data.main.feels_like);
  const windSpeed = Math.round(data.wind.speed);

  const descriptionCap =
    data.weather[0].description.charAt(0).toUpperCase() +
    data.weather[0].description.slice(1);

  weatherInfo.empty();

  // Insert weather information and current time into result sections
  $("<h2>").text(cityName).appendTo(weatherInfo);

  $("<p>").text(descriptionCap).appendTo(weatherInfo);
  $("<h3>").text(`Temperature: ${temp}°C`).appendTo(weatherInfo);
  $("<h5>").text(`Feels like: ${feel_like_temp}°C`).appendTo(weatherInfo);
  $("<p>").text(`Wind speed: ${windSpeed} m/s`).appendTo(weatherInfo);
};

//Fetch outfit image in outfits section
app.displayOutfitInfo = (data) => {
  let monthForOutfit = app.getCurrentMonth(); //Jan = 0 ~ Dec = 11
  const descriptionForOutfit = data.weather[0].main; //Rain or Snow
  const tempForOutfit = data.main.temp;

  console.log(monthForOutfit);
  console.log(descriptionForOutfit, tempForOutfit);

  const outfits = $("#outfits");
  outfits.empty();

  //fetch image based on weather-info and month
  if (descriptionForOutfit === "Rain") {
    if (monthForOutfit >= 5 && monthForOutfit <= 7) {
      outfits.append("<img src = 'assets/images/rainSummer.png' >");
    } else {
      outfits.append("<img src = 'assets/images/rainSpringFall.png' >");
    }
  } else if (descriptionForOutfit === "Snow") {
    outfits.append("<img src = 'assets/images/snow.png' >");
  } else {
    if (tempForOutfit >= 30) {
      outfits.append("<img src = 'assets/images/superHot.png' >");
    } else if (tempForOutfit >= 25 && tempForOutfit < 30) {
      outfits.append("<img src = 'assets/images/hot.png' >");
    } else if (tempForOutfit >= 20 && tempForOutfit < 25) {
      outfits.append("<img src = 'assets/images/warm.png' >");
    } else if (tempForOutfit >= 15 && tempForOutfit < 20) {
      outfits.append("<img src = 'assets/images/mild.png' >");
    } else if (tempForOutfit >= 10 && tempForOutfit < 15) {
      outfits.append("<img src = 'assets/images/cool.png' >");
    } else if (tempForOutfit >= 0 && tempForOutfit < 10) {
      outfits.append("<img src = 'assets/images/cold.png' >");
    } else {
      outfits.append("<img src = 'assets/images/freezing.png' >");
    }
  }
};

app.init = () => {
  app.handleOnFormSubmit();
};

//start of doc.ready
$(() => {
  app.init();
}); //end of doc.ready

//footer
$("#footerInfo").html(
  `<a href= https://junocollege.com/ target = "_blank">Created @ Juno College</a>`
);
