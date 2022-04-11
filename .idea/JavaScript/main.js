// David McCabe
function initMap() {
    // Create the map with no initial style specified.
    // It therefore has default styling.
    const CONTENT = 0,
        LATITUDE = 1,
        LONGITUDE = 2

    let dkitContent = `<div id=dkit-content>
                                        <h1>Dundalk Institute of Technology</h1>
                                        <div id=content>
                                            <img src = images/dkit_photo.png>
                                            <p>Dundalk Institute of Technology is the best place to study computing in Ireland </p>
                                            <p>For more information, see our website<br><a href=http://www.dkit.ie>www.dkit.ie</a></p>
                                        </div>
                                    </div>`
    let locations = [
        [dkitContent, 52.4786636980613, -1.899792551994324],
        ["Birmingahm Place 2", 52.48230978168494, -1.914796829223633],
        ["Birmingham Place 3", 52.50154146429483, -1.8980598449707033]

    ]

    fetch("../json/markerjson.json")
        .then(response => response.json())
        .then(data => loadlocation(data))
    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: new google.maps.LatLng(52.489471, -1.898575),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    })
    let infoWindow = new google.maps.InfoWindow()

    let loadlocation = (locations) => {

        locations.places.map(places => {
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(places.latitude, places.longitude),
                map: map
            })

            google.maps.event.addListener(marker, "click", () => {
                infoWindow.setContent(location[CONTENT])
                infoWindow.open(map, marker)
            })
        })

    }

    // Add a style-selector control to the map.
    const styleControl = document.getElementById("style-selector-control");

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);

    // Set the map's style to the initial value of the selector.
    const styleSelector = document.getElementById("style-selector");

    map.setOptions({ styles: styles[styleSelector.value] });
    // Apply new JSON when the user selects a different style.
    styleSelector.addEventListener("change", () => {
        map.setOptions({ styles: styles[styleSelector.value] });
    });
}

const styles = {
    default: [],
    night: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
        },
        {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
        },
        {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
        },
        {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
        },
        {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
        },
        {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
        },
        {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
        },
        {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
        },
        {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
        },
        {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
        },
        {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
        },
        {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
        },
    ],
    hiding: [{
            featureType: "poi.business",
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
        },
    ],
};