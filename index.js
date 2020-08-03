const wKey = "9e026bc061c41d18bb3f9243e2822d39";
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function () {
  const firstCityName = document.getElementById("firstCityName");
  const secondCityName = document.getElementById("secondCityName");

  console.log(firstCityName.value);
  console.log(secondCityName.value);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${firstCityName.value}&appid=${wKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })

    .catch((err) => alert("Wrong city name!"));
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${secondCityName.value}&appid=${wKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })

    .catch((err) => alert("Wrong city name!"));
});
