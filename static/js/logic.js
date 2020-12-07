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
    var time=new Date(earthquake.properties.time);
    var type=earthquake.properties.type;
    L.circle(earthquake.geometry.coordinates.slice(0,2).reverse(),{
      color: circleColor(earthquake.geometry.coordinates[2]),
      fillColor: circleColor(earthquake.geometry.coordinates[2]),
      fillOpacity: 0.75,
      radius: earthquake.properties.mag*10000
    })
    .bindPopup(`<p>Time:${time}</p><p>Type:${type}</p>`)
    .addTo(myMap);
  })

  var legend = L.control({position: 'bottomleft'});
  legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Depth in Km</strong>'],
    categories = ['<10','<20','<30','<40','<50','>50'];
    colors = ["red","orange","yellow","green","blue","purple"]

    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:' + colors[i] + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
    return div;
  };
  legend.addTo(myMap);

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