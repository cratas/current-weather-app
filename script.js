var isMapShown;

$(document).ready(function() {

    var isMapShown = false;
    var today = new Date();
    var date = today.getDate();
    var time = ('0' + today.getHours()).substr(-2) + ":" + ('0' + today.getMinutes()).substr(-2);
    var dateTime = time + ' - ' + (today.toLocaleString('en-us', { weekday: 'long' })) + ', ' + date +
        ' ' + (today.toLocaleString('en-us', { month: 'long' }).substring(0, 3));

    $('#dateTime').html(dateTime);

    $('#submitButton').click(function() {
        let inputCity = $('#cityInput').val();
        let weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputCity + '&appid=f1a2685da05fe3b5355e7f7a70db4d4c&lang=cz';

        fetch(weatherURL)
            .then(response => response.json())
            .then(data => {

                let mapURL = 'https://maps.google.com/maps?q=' + inputCity + '&t=&z=13&ie=UTF8&iwloc=&output=embed';

                $('#mapIFrame').attr("src", mapURL);
                $("#city").html(inputCity);
                $("#temperature").html(parseInt(data["main"]["temp"]) - 273 + "°")
                $("#description").html(data["weather"]["0"]["description"]);
                checkWeatherCondition(data["weather"]["0"]["id"]);
                $("#windSpeedOutput").html(data["wind"]["speed"]);
                $("#windSpeed").html(data["wind"]["speed"] + " m/s");
                $("#cloudiness").html(data["clouds"]["all"] + " %");
                $("#feelTemp").html(parseInt(data["main"]["feels_like"]) - 273 + "°");
                $("#pressure").html(data["main"]["pressure"] + " hPa");

                $('#cityInput').val("");


                console.log(data);
            })
            .catch(err => {
                alert("Wrong city name")
                $("#city").html("");
                $("#temperature").html("");
                $('.image-wrapper').hide();
                $('#cityInput').val("");
            });
    });


    $('#showMapButton').click(function() {
        isMapShown = (isMapShown == true) ? isMapShown = false : isMapShown = true;
        console.log(isMapShown);
        if (!isMapShown) {
            $('#showMapButton').text('\u21e3 Mapa');
            $('.map-wrapper').removeClass('animation-slide-down-class');
            $('.map-wrapper').addClass('animation-slide-up-class');
            // $('.map-wrapper').hide();
            setTimeout(function() {
                $('.map-wrapper').hide();
                // window.scrollTo(0, 0);
            }, 1000);
        } else {
            $('#showMapButton').text('\u21E1 Mapa');
            $('.map-wrapper').removeClass('animation-slide-up-class');
            $('.map-wrapper').addClass('animation-slide-down-class');
            $('.map-wrapper').show();


            for (let i = 0; i < 1000; i++) {
                setTimeout(function() {
                    window.scrollTo(0, document.body.scrollHeight);
                }, i);
            }
        }
    });

    $('.fav-cities-button').click(function() {
        let cityName = $(this).text();
        console.log(cityName);

        $('#cityInput').val(cityName);
        $('#submitButton').click();
        $('#cityInput').val("");
    });

});

function checkWeatherCondition(conditionParameter) {

    if (conditionParameter >= 200 && conditionParameter < 240) {
        $('.weather-icon').hide();
        $("#iconStorm").show();
        changeThemeRain();
    } else if (conditionParameter >= 300 && conditionParameter < 322) {
        $('.weather-icon').hide();
        $("#iconRain").show();
        changeThemeRain();
    } else if (conditionParameter >= 500 && conditionParameter < 532) {
        $('.weather-icon').hide();
        $("#iconRain").show();
        changeThemeRain();
    } else if (conditionParameter >= 600 && conditionParameter < 623) {
        $('.weather-icon').hide();
        $("#iconSnow").show();
    } else if (conditionParameter >= 701 && conditionParameter < 782) {
        $('.weather-icon').hide();
        $("#iconFog").show();
        changeThemeFog();
        console.log("kokot");
    } else if (conditionParameter == 800) {
        $('.weather-icon').hide();
        $("#iconSun").show();
        changeThemeSun();
    } else if (conditionParameter > 800 && conditionParameter < 805) {
        $('.weather-icon').hide();
        $("#iconCloud").show();
        changeThemeCloud();

    }
}

function changeThemeRain() {
    $('.conent-wrapper').css("background-image", "url('graphics/rain_background.jpg')");
    $('.all-background').css("background-image", "url('graphics/rain_background_blur.jpg')");
    document.documentElement.style
        .setProperty('--lightGrey', '#ababab');
}

function changeThemeFog() {
    $('.conent-wrapper').css("background-image", "url('graphics/fog_background.jpg')");
    $('.all-background').css("background-image", "url('graphics/fog_background_blur.jpg')");
    document.documentElement.style
        .setProperty('--lightGrey', '#fff');
}

function changeThemeSun() {
    $('.conent-wrapper').css("background-image", "url('graphics/sun_background.jpg')");
    $('.all-background').css("background-image", "url('graphics/sun_background_blur.jpg')");
    document.documentElement.style
        .setProperty('--lightGrey', '#fff');
}

function changeThemeCloud() {
    $('.conent-wrapper').css("background-image", "url('graphics/cloud_background.jpg')");
    $('.all-background').css("background-image", "url('graphics/cloud_background_blur.jpg')");
    document.documentElement.style
        .setProperty('--lightGrey', '#fff');
}