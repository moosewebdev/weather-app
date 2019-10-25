

window.addEventListener('load', function appStart(){
    var locationEle = document.querySelector('.weather-location');
    var tempMinEle = document.querySelector('.weather-info-low');
    var tempHighEle = document.querySelector('.weather-info-high');
    var curentTempEle = document.querySelector('.weather-info-temp');
    var sunUpEle = document.querySelector('.weather-sun-rise-text');
    var sunDownEle = document.querySelector('weather-sun-set-text');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocal);
      } else {
        locationEle.innerHTML = "Geolocation is not supported by this browser.";
      }
    
      function getLocal(position){
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        getWeatherData(lat, long);
        console.log(lat + " " + long);

      }

      function getWeatherData(lat, long){
          const api = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=metric&APPID=3e2d8aefac1e2f03a86df67c599a2623';
          var xhr = new XMLHttpRequest();
            console.log(api);
          xhr.onreadystatechange = function(){

            if(this.readyState == 4 && this.status ==200){
                var wData = JSON.parse(this.responseText);
                displayData(wData);
            }
        }
          xhr.open("GET", api , true);
            xhr.send();
      }

      function displayData(wData){
        console.log(wData);
        console.log(wData.name);
        locationEle.innerHTML = wData.name + ", " + wData.sys.country;
        tempMinEle.innerHTML = Math.round(wData.main.temp_min) + '&#8451';
        tempHighEle.innerHTML = Math.round(wData.main.temp_max) + '&#8451';
        curentTempEle.innerHTML = Math.round(wData.main.temp) + '&#8451';
        
        var date = new Date(wData.sys.sunrise);
        console.log(date);


        //sunUpEle
        //sunDownEle
      }
});