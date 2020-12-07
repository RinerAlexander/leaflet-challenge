var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"


var underlay =  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
})

var myMap = L.map("map", {
  center: [39.50, -99.35],
  zoom: 3,
  layers: [underlay]
});

d3.json(queryUrl, function(data) {

  data.features.forEach(function(earthquake){
    L.circle(earthquake.geometry.coordinates.slice(0,2).reverse(),{
      color: circleColor(earthquake.geometry.coordinates[2]),
      fillColor: circleColor(earthquake.geometry.coordinates[2]),
      fillOpacity: 0.75,
      radius: earthquake.properties.mag*10000
    }).addTo(myMap);
    // console.log(earthquake.geometry.coordinates.slice(0,2));
  })

})

function circleColor(depth){
  var color;
  if (depth<10){
    color="red"
  }
  else if (depth<20){
    color="orange"
  }
  else if (depth<30){
    color="yellow"
  }
  else if (depth<40){
    color="green"
  }
  else if (depth<50){
    color="blue"
  }
  else{
    color="purple"
  };
  return color;
}