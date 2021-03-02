mapboxgl.accessToken = 'pk.eyJ1IjoiaGVsbC1sb3JkIiwiYSI6ImNrY2Fvc2VudzFzcWEzM3Q2d2xjejNmb3oifQ.BjWkDbcDSp8irPgP9fSz9Q';
var map = new mapboxgl.Map({
container: 'map', 
style: 'mapbox://styles/mapbox/streets-v11', 
center: campground.geometry.coordinates, 
zoom: 9 
});

 new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .addTo(map);