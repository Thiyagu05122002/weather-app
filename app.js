// https://api.openweathermap.org/data/2.5/weather?q=India&appid=1c3aaff1edd224adb67b8dc51f93f43c&units=metric

let weather = {
  apiKey: "1c3aaff1edd224adb67b8dc51f93f43c",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    var x = $("#result-div").html();
    var y =
      `
      <div class="max-w-xs overflow-hidden rounded-lg shadow-lg bg-thBG text-gray-300 weather" id="main-div">
            <div class="flex items-end justify-end h-32 p-4 dark:bg-gray-500 bg-center bg-cover" id="box" style="background-image: url(https://source.unsplash.com/300x150/?` +
      name +
      `);">
                <p class="px-2 py-1 text-sm tracking-widest text-gray-100 uppercase bg-gray-800 bg-opacity-75 rounded shadow-lg
                 city">` +
      name +
      `</p>
            </div>
            <div class="flex justify-between p-4">
                <div class="flex flex-col flex-1 gap-4">
                    <div class="flex justify-between">
                        <div class="flex gap-2">
                            <span class="text-5xl font-semibold temp">` +
      temp +
      `°</span>
                        </div>
                        <img src="https://openweathermap.org/img/wn/` +
      icon +
      `.png" class="icon" alt="">
        
                    </div>
                    <p class="text-sm description uppercase">` +
      description +
      `
                    </p>
                </div>
                <div class="text-sm leading-loose">
                    <div class="flex items-center"></div>
                </div>
            </div>
            <div class="flex items-center justify-between gap-8 p-4 border-t dark:text-gray-400 dark:border-gray-700">
                <div class="flex items-center space-x-1">
                    <span class="font-bold humidity">` +
      humidity +
      `%</span>
                    <span class="text-sm">humidity</span>
                </div>
                <div class="flex items-center space-x-1">
                    <span class="font-bold wind">` +
      speed +
      `km/h</span>
                    <span class="text-sm">wind</span>
                </div>
            </div>
        </div>
      `;
    if ($("#result-div").children().length >= 3) return;
    $("#result-div").html(x + y);
    $("#simple-search").val('')
  },
  search: function () {
    this.fetchWeather(document.querySelector("#simple-search").value);
  },
};

$("#target").click(function () {
  weather.search();
});

$(".search-bar").keyup(function (e) {
  if (e.key == "Enter") {
    weather.search();
  }
});
