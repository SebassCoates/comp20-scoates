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

        closestSite = ["landmark", 2, coords]

        var myMarker = new google.maps.Marker({
                position: coords, 
                animation: google.maps.Animation.DROP,
                map: map,
                icon: ('mycon.jpg'),
        });

        var info = new google.maps.InfoWindow({
                content: "You have logged in at: " + "[" + coords.lat + ", " + coords.lng + "]"
        });
        info.open(map, myMarker);

        r.onreadystatechange = function() {
                if (r.readyState == 4 && r.status == 200) {
                        parsed = JSON.parse(r.responseText)
                        for (landmark in parsed.landmarks) {
                                curval = parsed.landmarks[landmark]
                                lpos = {lat: (curval.geometry.coordinates[1]) , lng: (curval.geometry.coordinates[0]) }
                                distance = computeDistance(lpos, coords)
                                if (distance < 1) {
                                        properties = curval.properties

                                        var info = new google.maps.InfoWindow({
                                                content: properties.Details
                                        });

                                        var landmarker = new google.maps.Marker({
                                                position: lpos,
                                                animation: google.maps.Animation.DROP,
                                                map: map,
                                                content: info.content,
                                                icon: ('location_icon.png'),
                                        });

                                        if (distance < closestSite[1]){
                                                closestSite[0] = landmarker
                                                closestSite[1] = distance
                                                closestSite[2] = lpos
                                                var closeInfo = new google.maps.InfoWindow({
                                                         content: "Name of closest historical site: " + getName(closestSite[0].content) + " | Distance: " + distance + " miles"
                                                });
                                        }

                                        google.maps.event.addListener(landmarker, 'click', function () {
                                                info.setContent(this.content);
                                                info.open(map, this);
                                        });
                                }
                        }
                        
                        google.maps.event.addListener(myMarker, 'click', function () {
                                closeInfo.open(map, this);
                        });

                        var shortestPath = new google.maps.Polyline({
                                path: [coords, closestSite[2]],
                                geodesic: true,
                                strokeColor: '#000000',
                                strokeOpacity: 1.0,
                                strokeWeight: 10
                        });

                        shortestPath.setMap(map);

                        for (person in parsed.people) {
                                curval = parsed.people[person]
                                lpos = {lat: curval.lat, lng: curval.lng}
                                if (lpos.lng == coords.lng && lpos.lat == coords.lat){
                                        continue //Don't self twice
                                }
                                distance = computeDistance(lpos, coords)

                                var info = new google.maps.InfoWindow({
                                        content: "login: " + curval.login + " |  Distance away: " + distance + " miles"
                                });
                                var personmarker = new google.maps.Marker({
                                        position: lpos, 
                                        animation: google.maps.Animation.DROP,
                                        map: map,
                                        content: info.content,
                                        icon: ('classmate_icon.png'),
                                });

                                google.maps.event.addListener(personmarker, 'click', function () {
                                        info.setContent(this.content);
                                        info.open(map, this);
                                });

                        }
                } 
        }; 
        r.send(sendstring)
}

function computeDistance(lpos, coords) {
        pos1 = new google.maps.LatLng(lpos.lat, lpos.lng)
        pos2 = new google.maps.LatLng(coords.lat, coords.lng)
        return toMiles(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2))
}

function toMiles(meters) {
        return 0.000621371 * meters
}

function getName(content) {
        startIndex = 0
        findingStart = true

        for (i = 0; i < content.length; i++) {
                if (findingStart) {
                        if (content[i] == '/') {
                                startIndex = i + 3
                                findingStart = false
                        }
                } else {
                        if (content[i] == '<') {
                                return content.substring(startIndex, i)
                        }
                }
        }
}
