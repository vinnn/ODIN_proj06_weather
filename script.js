
// https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d7d4d161de0b5a156ff892309052a01d



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// ASYNCHRONOUS GET REQUEST : USING AWAIT 
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// since 'await' does not work on the global scope, we have 
// to create an 'async' function that wraps our API call:
async function retrieveWeatherData(locCity="London") {

    try {
        const api_key = "d7d4d161de0b5a156ff892309052a01d"; 
        const urlRoot = "api.openweathermap.org/data/2.5/weather";
        const url = "https://" + urlRoot + "?q=" + locCity + "&APPID=" + api_key;

        const response = await fetch(url, {mode: 'cors'});
        const response_json = await response.json();

        console.log(response_json);

        let city_name = response_json.name;
        let country_name = response_json.sys["country"];
        let desc = response_json.weather[0]["description"];
        let temp_min = response_json["main"]["temp_min"];
        let temp_max = response_json["main"]["temp_max"];
        let wind_speed = response_json["wind"]["speed"];

        updateFields(city_name, country_name, desc, temp_min, temp_max, wind_speed);
    
    } catch (err) {
        console.log(err);
    }
}



function initialRender() {
    retrieveWeatherData("London");
    listenSearchCity();
    listenChangeTempUnit();
}



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// RENDERING FUNCTION 
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function updateFields(city, country, desc, temp_min, temp_max, wind_speed) {

    document.getElementById("city").innerText = city;
    document.getElementById("country").innerText = country;
    document.getElementById("description").innerText = desc;
    document.getElementById("temp-min").innerText = temp_min;
    document.getElementById("btn-temp-min").innerText = "degK";
    document.getElementById("temp-max").innerText = temp_max;
    document.getElementById("btn-temp-max").innerText = "degK";
    document.getElementById("wind-speed").innerText = wind_speed;

}



function listenSearchCity() {

    const input_search = document.getElementById("input-city");
    const button_search = document.getElementById("btn-city");

    button_search.onclick = (e) => {
        let city_name = input_search.value;
        console.log(city_name);
        retrieveWeatherData(city_name)
    }
}


function listenChangeTempUnit() {

    const button_temp = document.querySelectorAll(".btn-temp");

    const div_temp_min = document.getElementById("temp-min");
    const div_temp_max = document.getElementById("temp-max");

    const btn_temp_min = document.getElementById("btn-temp-min");
    const btn_temp_max = document.getElementById("btn-temp-max");

    button_temp.forEach( btn => 
        btn.onclick = (e) => {

            let temp_min = div_temp_min.innerText;
            let temp_max = div_temp_max.innerText;

            if (btn.innerText == "degK") { // then convert to degC
                temp_min = Number(temp_min) - 273.15;
                temp_max = Number(temp_max) - 273.15;

                // temp_min = (temp_min - 32) * 5 / 9;
                // temp_max = (temp_max - 32) * 5 / 9;

                div_temp_min.innerText = temp_min;
                div_temp_max.innerText = temp_max;
                btn_temp_min.innerText = "degC";
                btn_temp_max.innerText = "degC";
            }
            else { // then convert to degK
                temp_min = Number(temp_min) + 273.15;
                temp_max = Number(temp_max) + 273.15;

                // temp_min = (9 * temp_min / 5) + 32;
                // temp_max = (9 * temp_max / 5) + 32;

                div_temp_min.innerText = temp_min;
                div_temp_max.innerText = temp_max;
                btn_temp_min.innerText = "degK";
                btn_temp_max.innerText = "degK";
            }
    })
}



initialRender();




