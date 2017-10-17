function initializePage(){ 
        navigator.geolocation.getCurrentPosition(initMap)
        initMap()
}

function initMap(pos){
        if (pos!= undefined) {
                console.log(pos)
                u_coords = pos.coords;
                var coords ={lat: u_coords.latitude, lng: u_coords.longitude} 
                var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 12,
                        center: coords 
                });

                var marker = new google.maps.Marker({
                    position: coords,
                    map: map,
                    title: 'Hello World!'
                });
        }
}
