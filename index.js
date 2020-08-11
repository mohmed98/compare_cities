"use strict";
// global vairables

const wKey = "3684574286a446a6ac4122632200508";
const submitBtn = document.getElementById("submitBtn");
const resultArea = document.getElementById("resultSec");
const loadingSec = document.querySelector(".loadingSec");
// the mail function that start the script when user submit cities names

submitBtn.addEventListener("click", function () {
  // getting user data
  resultArea.innerHTML = "";

  loadingSec.style.display = "block";
  const firstCityName = document.getElementById("firstCityName");
  const secondCityName = document.getElementById("secondCityName");
  // inilize arrays for strong city weather daya for 8 days
  const firstCitydata = new Array();
  let secondCitydata = [];
  // get request date and calulte 8 days bevore and store it in dates array
  const dates = req_dates();
  let currentReq = [new HisCityDayWeather(), new HisCityDayWeather()];
  //fetch each day wether data
  for (let i = 0; i < dates.length; i++) {
    // first city fetch function call

    getData(firstCityName.value, dates[i]).then((data) => {
      currentReq[0].name = data.location.name;
      currentReq[0].day.push(data.forecast.forecastday[0].day);
      currentReq[0].date.push(data.forecast.forecastday[0].date);
    });

    getData(secondCityName.value, dates[i]).then((data) => {
      currentReq[1].name = data.location.name;
      currentReq[1].day.push(data.forecast.forecastday[0].day);
      currentReq[1].date.push(data.forecast.forecastday[0].date);
      stor_in_array(currentReq);
    });
  }
  function stor_in_array(citydata) {
    if (citydata[1].day.length === 8 && citydata[0].day.length === 8) {
      loadingSec.style.display = "none";

      build_3Row_table(dates, citydata[0], citydata[1]);
    }
  }
});
// date function
function req_dates() {
  // request day date
  const today = new Date();
  let dateArrya = [];
  // calulate 8 days perv the current one
  for (let day = 0; day <= 7; day++) {
    const currentDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - day
    );
    // formate date to match api request format
    const dateFormat = `${currentDay.getFullYear()}-${
      currentDay.getMonth() + 1
    }-${currentDay.getDate()}`;
    dateArrya.push(dateFormat);
  }
  return dateArrya;
}
// fetch function
async function getData(cityName, date) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/history.json?key=${wKey}&q=${cityName}&dt=${date}`
    );
    let data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return data["error"]["code"];
    }
  } catch (err) {
    console.log(err);
  }
}

function HisCityDayWeather() {
  this.name = name;
  this.day = [];
  this.date = [];
}

function build_3Row_table(dateArr, firstRow, secondRow) {
  const tableTitle = document.createElement("h2");
  const tableTitleContnet = document.createTextNode(
    "Max Temprture in Celsuios"
  );
  const copyRight = document.createElement("a");
  copyRight.target = "_blank";
  copyRight.href = "https://www.weatherapi.com/";
  copyRight.className = "copyRight";
  copyRight.innerText = "Data were collected from www.weatherapi.com";

  tableTitle.appendChild(tableTitleContnet);
  let tableHeaderValues = ["Name"];
  for (let i = 0; i < dateArr.length; i++) {
    tableHeaderValues.push(firstRow.date[i]);
  }

  let maxTempTable = document.createElement("table");
  maxTempTable.className = "dataTable";
  let headerRow = maxTempTable.insertRow(0);
  let firstCityRow = maxTempTable.insertRow(1);
  let secondCityRow = maxTempTable.insertRow(2);

  for (let i = 0; i <= firstRow.day.length; i++) {
    let hR1TempCellValue = headerRow.insertCell(i);
    let r1TempCellValue = firstCityRow.insertCell(i);
    let r2TempCellValue = secondCityRow.insertCell(i);

    hR1TempCellValue.textContent = tableHeaderValues[i];

    if (i > 0) {
      r1TempCellValue.textContent = firstRow.day[i - 1].maxtemp_c;
      r2TempCellValue.textContent = secondRow.day[i - 1].maxtemp_c;
    } else {
      r1TempCellValue.textContent = firstRow.name;
      r2TempCellValue.textContent = secondRow.name;
    }
  }
  resultArea.appendChild(tableTitle);
  resultArea.appendChild(maxTempTable);
  resultArea.appendChild(copyRight);
}
