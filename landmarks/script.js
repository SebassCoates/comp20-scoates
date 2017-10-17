function initializePage(){ 
        navigator.geolocation.getCurrentPosition(initMap)
        initMap()
}

function initMap(pos){
        if (pos!= undefined) {
                u_coords = pos.coords;
                var coords ={lat: u_coords.latitude, lng: u_coords.longitude} 
                var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 12,
                        center: coords 
                });
                addMarkers(map, coords)
        }
}

function addMarkers(map, coords) {
        var r = new XMLHttpRequest()
        sendstring = "login=CCqBXEWf" + "&lat=" + coords.lat + "&lng=" + coords.lng
        r.open("POST","https://defense-in-derpth.herokuapp.com/sendLocation" ,true)
        r.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

        r.onreadystatechange = function() {
                if (r.readyState == 4 && r.status == 200) {
                
                } 
        }; 
        r.send(sendstring)
        
        var marker = new google.maps.Marker({
            position: coords,
            map: map,
            title: 'Hello World!'
        });
}
