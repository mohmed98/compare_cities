"use strict";
// global vairables

const wKey = "3684574286a446a6ac4122632200508";
const submitBtn = document.getElementById("submitBtn");
const resultArea = document.getElementById("resultSec");
const loadingSec = document.querySelector(".loadingSec");
// the mail function that start the script when user submit cities names


submitBtn.addEventListener("click", init);


// init fn
function init() {
  resultArea.innerHTML = "";
  loadingSec.style.display = "block";

  const firstCityName = document.getElementById("firstCityName");
  const secondCityName = document.getElementById("secondCityName");
  const dates = req_dates();
  store_data(dates, firstCityName, secondCityName).then(function (result) {
    loadingSec.style.display = "none";
    console.log(result);
    build_3Row_table(dates, result[0], result[1]);
  });
}

// store_data fn
async function store_data(dateArr, fCityName, sCityName) {
  const currentReq = [new HisCityDayWeather(), new HisCityDayWeather()];

  for (let i = 0; i < dateArr.length; i++) {
    // first city fetch function call
    const fTemp = await getData(fCityName.value, dateArr[i]);


    currentReq[0].name = fTemp.location.name;
    currentReq[0].day.push(fTemp.forecast.forecastday[0].day);
    currentReq[0].date.push(fTemp.forecast.forecastday[0].date);


    const sTemp = await getData(sCityName.value, dateArr[i]);

    currentReq[1].name = sTemp.location.name;
    currentReq[1].day.push(sTemp.forecast.forecastday[0].day);
    currentReq[1].date.push(sTemp.forecast.forecastday[0].date);
  }
  return currentReq;
}

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
      console.log(data);

      return data;
    } else {
      loadingSec.style.display = "none";
      resultArea.innerHTML = "CHECK YOUR DATA";
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
