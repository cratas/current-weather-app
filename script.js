$(document).ready(function() {

    $('#submitButton').click(function() {
        let inputCity = $('#cityInput').val();
        let weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputCity + '&appid=f1a2685da05fe3b5355e7f7a70db4d4c';

        fetch(weatherURL)
            .then(response => response.json())
            .then(data => {
                
                let mapURL = 'https://maps.google.com/maps?q=' + inputCity + '&t=&z=13&ie=UTF8&iwloc=&output=embed';

                $('#mapIFrame').attr("src", mapURL);
                $("#locationOutput").html(inputCity);
                $("#temperatureOutput").html(data["main"]["temp"]);
                $("#descriptionOutput").html(data["weather"]["0"]["description"]);
                $("#windSpeedOutput").html(data["wind"]["speed"]);
                $("#windSpeed").html(data["wind"]["speed"] + " m/s");
                $("#cloudiness").html(data["clouds"]["all"] + " %");
                $("#feelTemp").html(parseInt(data["main"]["feels_like"]) - 273 + "°");
                $("#pressure").html(data["main"]["pressure"] + " hPa");
                
                $('#cityInput').val("");

                console.log(data);
            })
        .catch(err => alert("Wrong city name"));
    });


    $('.fav-cities-button').click(function() {
        let cityName = $(this).text();;
        console.log(cityName);

        $('#cityInput').val(cityName);
        $('#submitButton').click();
        $('#cityInput').val("");
    });

    function wrongInput() {
        $('#mapIFrame').attr("src", "mapURL");
        $("#locationOutput").html("");
        $("#temperatureOutput").html("");
        $("#descriptionOutput").html("");
        $("#windSpeedOutput").html("");
    }


    // When the user scrolls the page, execute myFunction
    // window.onscroll = function() {
    //     myFunction()
    // };

    // function myFunction() {
    //     var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    //     var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    //     var scrolled = (winScroll / height) * 100;
    //     document.getElementById("myBar").style.width = scrolled + "%";
    // }
});