let weather = {
	apiKey: "1f5a5e1182ef7cbc174549bcbddcb629",
	fatchWeather: function (city) {
		fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKey)
			.then((response) => response.json())
			.then((data) => this.renderWeather(data));
	},
	renderWeather: function (data) {
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;
		console.log(name, icon, description, temp, humidity, speed);
		document.querySelector(".city").textContent = "Weather in " + name;
		document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
		document.querySelector(".temp").textContent = Math.round(temp - 273.15) + "°C";
		document.querySelector(".humidity").textContent = "目前濕度為" + humidity + "%";
		document.querySelector(".wind").textContent = "目前風速為" + speed + "km/h";
		document.querySelector(".weather").classList.remove("loading");
		document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
	},
	search: function () {
		this.fatchWeather(document.querySelector(".search-bar").value);
	}
};
	let btn = document.querySelector('button').addEventListener("click", function () {
		weather.search();
    document.querySelector(".search-bar").value = '';
	})

//weather.fatchWeather("keelung")
