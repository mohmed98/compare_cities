const wKey = "3684574286a446a6ac4122632200508";
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function () {

  const firstCityName = document.getElementById("firstCityName");
  const secondCityName = document.getElementById("secondCityName");

  console.log(firstCityName.value);
  console.log(secondCityName.value);
  const dates = req_dates()
  for(let i = 2;i<dates.length;i++){
    console.log(dates[i]);
  fetch(
    `http://api.weatherapi.com/v1/history.json?key=${wKey}&q=${firstCityName.value}&dt=${dates[2]}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })

    .catch((err) => alert("Wrong city name!"));
  fetch(
    `http://api.weatherapi.com/v1/history.json?key=${wKey}&q=${secondCityName.value}&dt=${dates[i]}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })

    .catch((err) => alert("Wrong city name!"));
  }

});
function req_dates(){
  const today = new Date();
  let dateArrya = [];
  for(let day=0;day<=7;day++){
    const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()-day);
    const dateFormat =`${currentDay.getFullYear()}-${currentDay.getMonth()+1}-${currentDay.getDate()}`;
    dateArrya.push(dateFormat);
  }
  return dateArrya;
}
