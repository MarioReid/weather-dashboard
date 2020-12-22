
      $(document).ready(function () {
        //DOM VARIABLE

        //JAVASCRIPT VARIABLES
        var cityArray = [];
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
            $("city").text()
          })

          init();
        });
      });