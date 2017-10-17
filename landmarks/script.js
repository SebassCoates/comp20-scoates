function initializePage() {

}

function initMap(){
        var coords = {lat: -25.363, lng: 131.044};
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
