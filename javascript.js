// Part 1: Display current date on the main page

// fetching current date from JS
let fetchedDate = new Date();

// setting date variables and populating with fetched date details
let currentMinutes = fetchedDate.getMinutes();
let currentHour = fetchedDate.getHours();
let currentDayInteger = fetchedDate.getDay();
let currentDate = fetchedDate.getDate();
let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDayName = dayNames[currentDayInteger];
let currentMonthInteger = fetchedDate.getMonth();
let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonthName = monthNames[currentMonthInteger];

// get date elements to be displayed in html
let dayDisplayed = document.querySelector("#displayed-day");
let dateDisplayed = document.querySelector("#displayed-date");
let monthDisplayed = document.querySelector("#displayed-month");
let hourDisplayed = document.querySelector("#displayed-hour");
let minutesDisplayed = document.querySelector("#displayed-minutes");

// update HTML with fetched variables
dayDisplayed.innerHTML = `${currentDayName}`;
dateDisplayed.innerHTML = `${currentDate}`;
monthDisplayed.innerHTML = `${currentMonthName}`;
hourDisplayed.innerHTML = `${currentHour}`;
minutesDisplayed.innerHTML = `${currentMinutes}`;

// Part 2: enable search city engine

// fetching information from HTML and creating function
let locationForm = document.querySelector("#location-form");

function preventEventDefault(event) {
  event.preventDefault();
}

function getInputCity() {
  return document.querySelector("#location-input").value;
}

function displayInputtedCity(city) {
  let displayCity = document.querySelector("#display-city");
  displayCity.innerHTML = `${city}`;
}

function extractTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  return temperature
}

async function queryCityWeather(apiUrl, apiKey) {
  return axios.get(`${apiUrl}&appid=${apiKey}`);
}

function displayTemperature(temperature) {
  let temperatureElement = document.querySelector("#displayed-temperature");
  temperatureElement.innerHTML = `${temperature} °C`;
}


// creating event listeners
locationForm.addEventListener("submit", async (event) => {
  preventEventDefault(event);
  const inputCity = getInputCity();
  displayInputtedCity(inputCity);
  let apiKey = "6ccb6461ce57159a9f0ed4cc5c3a9bdf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric`;
  let weatherResult = await queryCityWeather(apiUrl, apiKey);
  let temperature = extractTemperature(weatherResult);
  displayTemperature(temperature);
}
);


// Part 3: switching between celsius and fahrenheit

// define celsiusButton and fahrenheitButton variables
let celsiusButton = document.querySelector("#celsius-button");
let fahrenheitButton = document.querySelector("#fahrenheit-button");

// define celsiusButton and fahrenheitButton functions
function celsiusButtonClick() {
  // makes the celsius button active
  let celsiusButtonForFunction = document.querySelector("#celsius-button");
  let fahrenheitButtonForFunction =
    document.querySelector("#fahrenheit-button");

  fahrenheitButtonForFunction.classList.remove("active");
  celsiusButtonForFunction.classList.add("active");

  // changes the displayed temperature to celsius
  let displayedTemperature = document.querySelector("#displayed-temperature");
  displayedTemperature.innerHTML = `30 °C`;
}

function fahrenheitButtonClick() {
  // makes the fahrenheit button active
  let celsiusButtonForFunction = document.querySelector("#celsius-button");
  let fahrenheitButtonForFunction =
    document.querySelector("#fahrenheit-button");
  fahrenheitButtonForFunction.classList.add("active");
  celsiusButtonForFunction.classList.remove("active");

  // changes the displayed temperature to fahrenheit
  let displayedTemperature = document.querySelector("#displayed-temperature");
  displayedTemperature.innerHTML = `86 °F`;
}

//add event listeners
celsiusButton.addEventListener("click", celsiusButtonClick);
fahrenheitButton.addEventListener("click", fahrenheitButtonClick);