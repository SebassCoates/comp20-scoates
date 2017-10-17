function initializePage(){ 
        navigator.geolocation.getCurrentPosition(initMap)
        initMap()
}

function initMap(pos){
        console.log(pos)
        var coords = {lat: -25.363, lng: 131.044}
        var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: coords 
        });

        var marker = new google.maps.Marker({
            position: coords,
            map: map,
            title: 'Hello World!'
        });
}
