$(document).ready(function() {

    $('#submitButton').click(function() {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=f1a2685da05fe3b5355e7f7a70db4d4c')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data["base"]);
            })

        .catch(err => alert("Wrong city name"));
    });


    // When the user scrolls the page, execute myFunction
    window.onscroll = function() {
        myFunction()
    };

    function myFunction() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
    }
});