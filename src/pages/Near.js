import { google } from 'google-maps';


let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
  <script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDgYD-yjDO9bqmrFYuOZWwDKa3uX6DSJAI&callback=initMap">
        
    </script>
}

export default initMap;