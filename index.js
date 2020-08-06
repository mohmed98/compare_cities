// global vairables

const wKey = "3684574286a446a6ac4122632200508";
const submitBtn = document.getElementById("submitBtn");
const resultArea = document.getElementById("resultSec");
// the mail function that start the script when user submit cities names
submitBtn.addEventListener("click", function () {
  // getting user data
  const firstCityName = document.getElementById("firstCityName");
  const secondCityName = document.getElementById("secondCityName");
  // inilize arrays for strong city weather daya for 8 days
  let fistCitydata = [];
  let secondCitydata = [];
  // get request date and calulte 8 days bevore and store it in dates array
  const dates = req_dates();
  let tableHeaderValues = ["Name"];
  for (let i = 0; i < dates.length; i++) {
    tableHeaderValues.push(dates[i]);
  }
  let maxTempTable = document.createElement("table");
  let headerRow = maxTempTable.insertRow(0);

  for (let i = 0; i < tableHeaderValues.length; i++) {
    let tempCellContainer = headerRow.insertCell(i);
    let tempCellValue = document.createTextNode(tableHeaderValues[i]);
    tempCellContainer.appendChild(tempCellValue);
  }
  let firstCityRow = maxTempTable.insertRow(1);
  let secondCityRow = maxTempTable.insertRow(2);

  //fetch each day wether data
  for (let i = 0; i < dates.length; i++) {
    // first city fetch function call
    getData(firstCityName.value, dates[i]).then((data) => {
      console.log(data.forecast.forecastday[0].day.maxtemp_c);
      let tempCellContainer = firstCityRow.insertCell(i);
      let tempCellValue = document.createTextNode(
        data.forecast.forecastday[0].day.maxtemp_c
      );
      tempCellContainer.appendChild(tempCellValue);

      fistCitydata.push(
        // store response data in new object and then pushed it in array
        new HisCityDayWeather(
          data.location.name,
          data.forecast.forecastday[0].day.maxtemp_c,
          data.forecast.forecastday[0].date
        )
      );

      // console.log(fistCitydata);
    });

    // getData(secondCityName.value, dates[i]).then((data) => {
    //   secondCitydata.push(
    //     new HisCityDayWeather(
    //       data.location.name,
    //       data.forecast.forecastday[0].day,
    //       data.forecast.forecastday[0].date
    //     )
    //   );

    //   // console.log(secondCitydata[i]);
    // });
  }

  // let headerRow = maxTempTable.insertRow(0);

  // for (let i = 0; i < tableHeaderValues.length; i++) {
  //   let tempCellContainer = headerRow.insertCell(i);
  //   let tempCellValue = document.createTextNode(tableHeaderValues[i]);
  //   tempCellContainer.appendChild(tempCellValue);
  // }
  // let firstCityRow = maxTempTable.insertRow(1);
  // let secondCityRow = maxTempTable.insertRow(2);

  // for (let i = 0; i < 8; i++) {
  //   console.log(fistCitydata.length);

  //   // let tempCellContainer = firstCityRow.insertCell(i);
  //   // if (i == 0) {
  //   //   let tempCellValue = document.createTextNode(fistCitydata[i].name);
  //   // } else {
  //   //   let tempCellValue = document.createTextNode(
  //   //     fistCitydata[i].forecast.forecastday[0].day.maxtemp_c
  //   //   );
  //   // }
  //   // tempCellContainer.appendChild(tempCellValue);
  // }
  resultArea.appendChild(maxTempTable);
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
      `http://api.weatherapi.com/v1/history.json?key=${wKey}&q=${cityName}&dt=${date}`
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

function HisCityDayWeather(name, dayweather, date) {
  this.name = name;
  this.day = dayweather;
  this.date = date;
}
