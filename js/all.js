let weather = {
	apiKey: "1f5a5e1182ef7cbc174549bcbddcb629",
	fetchWeather: function (city) {
		fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKey)
			.then(function (response) {
				// console.log(response);
				if (response.status == 404) {
					document.querySelector(".weather").classList.add("loading");
					document.querySelector(".error").classList.add("block");
					document.querySelector(".error").textContent = "請重新搜尋 Q_Q ~";
					return
				} else {
					return 	response.json();
				}
		})
		.then((data) => this.renderWeather(data))
	},
	renderWeather: function (data) {
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;
		// console.log(name, icon, description, temp, humidity, speed);
		document.querySelector(".city").textContent = "Weather in " + name;
		document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
		document.querySelector(".temp").textContent = Math.round(temp - 273.15) + "°C";
		document.querySelector(".humidity").textContent = "目前濕度為" + humidity + "%";
		document.querySelector(".wind").textContent = "目前風速為" + speed + "km/h";
		document.querySelector(".weather").classList.remove("loading");
		document.querySelector(".error").classList.remove("block");
		document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
	},
	search: function () {
		this.fetchWeather(document.querySelector(".search-bar").value);
	}
};
	let btn = document.querySelector('button').addEventListener("click", function () {
		weather.search();
    document.querySelector(".search-bar").value = '';
	})


	document.querySelector(".search-bar").addEventListener("keyup", function (e) {
    if(e.key == 'Enter'){
			weather.search();
    }
  });
