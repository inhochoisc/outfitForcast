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

app.getCurrentTime = () => {
  const date = new Date();

  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "short",
    day: "numeric",
  });
  console.log(formattedTime);

  return formattedTime;
};

app.getCurrentMonth = () => {
  const date = new Date();

  const currentMonthNum = date.getMonth();

  return currentMonthNum;
};

//Fetch data in results section
app.displayWeatherInfo = (data) => {
  console.log(data);
  const currentTime = app.getCurrentTime();

  const results = $("#results");
  const cityName = data.name;
  const description = data.weather[0].description;
  const temp = Math.round(data.main.temp); //omit number under the decimal point
  const feel_like_temp = Math.round(data.main.feels_like);
  const windSpeed = Math.round(data.wind.speed);
  console.log(windSpeed);
  results.empty();
  const descriptionCap =
    data.weather[0].description.charAt(0).toUpperCase() +
    data.weather[0].description.slice(1);

  // Insert weather information and current time into result sections
  $("<h2>").text(cityName).appendTo(results);

  $("<p>").text(`Now ${currentTime}`).appendTo(results).css("color", "gray");
  $("<p>").text(descriptionCap).appendTo(results);
  $("<h3>").text(`Temperature: ${temp}°C`).appendTo(results);
  $("<h5>").text(`Feels like: ${feel_like_temp}°C`).appendTo(results);
  $("<p>").text(`Wind speed: ${windSpeed} m/s`).appendTo(results);
};

//Fetch outfit image in outfits section
app.displayOutfitInfo = (data) => {
  const monthForOutfit = app.getCurrentMonth(); //Jan = 0 ~ Dec = 11
  const descriptionForOutfit = data.weather[0].main; //Rain or Snow
  const tempForOutfit = data.main.temp;

  console.log(monthForOutfit);
  console.log(descriptionForOutfit, tempForOutfit);

  const outfits = $("#outfits");
  outfits.empty();

  if (monthForOutfit === 3) {
    outfits.append("<img src = 'assets/images/typicalSpringFall.png' >");
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
