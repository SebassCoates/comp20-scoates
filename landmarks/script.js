function initializePage(){ 
        navigator.geolocation.getCurrentPosition(initMap)
        initMap()
}

function initMap(pos){
        if (pos!= undefined) {
                u_coords = pos.coords;
                var coords ={lat: u_coords.latitude, lng: u_coords.longitude} 
                var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 16,
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

        var myMarker = new google.maps.Marker({
                position: coords, 
                animation: google.maps.Animation.DROP,
                map: map,
                icon: ('mycon.jpg'),
        });

        r.onreadystatechange = function() {
                if (r.readyState == 4 && r.status == 200) {
                        parsed = JSON.parse(r.responseText)
                        console.log(parsed)
                        for (landmark in parsed.landmarks) {
                                curval = parsed.landmarks[landmark]
                                lpos = {lat: (curval.geometry.coordinates[0]) , lng: (curval.geometry.coordinates[1]) }
                                properties = curval.properties
                                var landmarker = new google.maps.Marker({
                                        position: lpos,
                                        animation: google.maps.Animation.DROP,
                                        map: map,
                                        icon: ('location_icon.png'),
                                });
                                //console.log(landmarker)
                        }
                        for (person in parsed.people) {
                                curval = parsed.people[person]
                                lpos = {lat: curval.lat, lng: curval.lng}
                                if (lpos.lng == coords.lng && lpos.lat == coords.lat){
                                        continue //Don't self twice
                                }
                                var personmarker = new google.maps.Marker({
                                        position: lpos, 
                                        animation: google.maps.Animation.DROP,
                                        map: map,
                                        label: curval.login,
                                        icon: ('classmate_icon.png'),
                                });
                        }
                } 
        }; 
        r.send(sendstring)
}
