$(document).ready(function () {
        //DOM VARIABLE

        //JAVASCRIPT VARIABLES
        var cityArray = [];
        var cityNameEL = $("#city-name2");
        var tempEL = $("#temperature");
        var humidityEL = $("#humidity");
        var windSpeedEL = $("#wind-speed");
        var uvIndexEL = $("#UV-index");
        //FUNCTION DEFINITIONS

        function init() {
          var citiesFromStorage = JSON.parse(localStorage.getItem("cityArray"));
          if (citiesFromStorage !== null) {
            cityArray = citiesFromStorage;
          }
          renderButtons();
        }

        function renderButtons() {
          $("#buttons-display").empty();
          for (var i = 0; i < cityArray.length; i++) {
            var button = $("<button>")
              .addClass("btn btn-info")
              .text(cityArray[i]);
            $("#buttons-display").append(button);
          }
        }

        //FUNCTION CALLS
        init();
        $().prepend()
        //EVENT LISTENERS
        $("#city-form").on("submit", function (e) {
          e.preventDefault();
          console.log("You submitted the form");
          var newCity = $("#city-name").val();

          cityArray.push(newCity);
          localStorage.setItem("cityArray", JSON.stringify(cityArray));
          renderButtons();

          //AJAX CALL


          //var newRow=$("<tr>");
          //var titleTd = $("<td>").text(response.Title);
          //newRow.append(titleTd)
          
          var APIKey = "cebf12f8e299937f0d7bd19ab1e7f12d";

          var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=" + APIKey;
            console.log(queryURL);

          $.ajax({
            url:queryURL,
            method:"GET"
          }).then(function(response){
            console.log(response);
            console.log(queryURL);
            // $("city").text()

          var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIKey;

            $.ajax({
              url: queryURL2,
              method: "GET"
            }).then(function(response2) {


              console.log(response2);

              var currentDate=moment().format('MM/DD/YYYY')
              cityNameEL.text(response.name + ' (' + currentDate + ')')
              var tempF = Math.round((((response.main.temp-273.15)*1.8)+32)*100)/100;
              tempEL.text("Temperature: " + tempF + "°F")
              humidityEL.text("Humidity: " + response.main.humidity)
              windSpeedEL.text("Wind Speed: " + response.wind.speed)
              uvIndexEL.text("UV index: " + response2.value)

            })

          })

          //// the start of 5 day

          var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q="+ newCity+"&appid=" + APIKey;

          $.ajax({
            url: queryURL3,
            method: "GET"
          }).then(function(response3) {

            var day1Data = response3.list[0];
            $('#day1-date').text(moment.unix(day1Data.dt).format('MM/DD/YYYY'));
            $('#day1-temp').text(day1Data.main.temp);
            $('#day1-humidity').text(day1Data.main.humidity);

            var day2Data = response3.list[8];
            $('#day2-date').text(moment.unix(day2Data.dt).format('MM/DD/YYYY'));
            $('#day2-temp').text(day2Data.main.temp);
            $('#day2-humidity').text(day2Data.main.humidity);

            var day3Data = response3.list[16];
            $('#day3-date').text(moment.unix(day3Data.dt).format('MM/DD/YYYY'));
            $('#day3-temp').text(day3Data.main.temp);
            $('#day3-humidity').text(day3Data.main.humidity);

            var day4Data = response3.list[24];
            $('#day4-date').text(moment.unix(day4Data.dt).format('MM/DD/YYYY'));
            $('#day4-temp').text(day4Data.main.temp);
            $('#day4-humidity').text(day4Data.main.humidity);

            var day5Data = response3.list[32];
            $('#day5-date').text(moment.unix(day5Data.dt).format('MM/DD/YYYY'));
            $('#day5-temp').text(day5Data.main.temp);
            $('#day5-humidity').text(day5Data.main.humidity);

            console.log(day1Data);
          })


        });
      });