function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: {lat:51.507602,lng:-0.127816}
  });
  
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

window.initMap = initMap;
