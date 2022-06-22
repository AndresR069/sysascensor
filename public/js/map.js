  //...........MAPBOX.....................................
  /*
  mapboxgl.accessToken = 'pk.eyJ1Ijoia2Rhdmlkcm9jaGEiLCJhIjoiY2w0N2ZrMnVpMDAxYzNidDdibDE4dXBjaCJ9.OcgF2O72ox3dK-JNpnV8nQ';
  const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-74.3610158,4.343664], //puntos localizacion fusa
  zoom: 13
  });
   
  // Ubicacion conjunto : MULTIFAMILIAR MIRADOR DE KATALEYA
  const marker1 = new mapboxgl.Marker()
  .setLngLat([-74.3665413, 4.3300473])
  .addTo(map);
   
  
  
 // Ubicacion conjunto : CONJUNTO RESIDENCIAL PARQUE LOS CAMBULOS I - TORRE 1 Y 2
  const marker2 = new mapboxgl.Marker()
  .setLngLat([-74.4077949, 4.3254579])
  .addTo(map);
   
  
 // Ubicacion conjunto : CONJUNTO RESIDENCIAL PARQUE LOS CAMBULOS III - TORRE 3 
  const marker3 = new mapboxgl.Marker()
  .setLngLat([-74.4019845, 4.3297718])
  .addTo(map);



  // Ubicacion conjunto : CONJUNTO RESIDENCIAL LAS HELICONIAS
  const marker4 = new mapboxgl.Marker()
  .setLngLat([-74.4075569, 4.3295705])
  .addTo(map);


   // Ubicacion conjunto : CONJUNTO RESIDENCIAL TORRES DE SANTA ANA No. 1
   const marker5 = new mapboxgl.Marker()
   .setLngLat([-74.3748373, 4.3329439])
   .addTo(map);
*/


mapboxgl.accessToken = 'pk.eyJ1Ijoia2Rhdmlkcm9jaGEiLCJhIjoiY2w0N2ZrMnVpMDAxYzNidDdibDE4dXBjaCJ9.OcgF2O72ox3dK-JNpnV8nQ';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-74.3610158,4.343664], //puntos localizacion fusa
zoom: 15.5,
bearing: 27,
pitch: 45
});
 
const chapters = {
'1': {
bearing: 27,
center: [-74.3665413, 4.3300473],
zoom: 15.5,
pitch: 20
},
'2': {
duration: 6000,
center: [-74.4077949, 4.3254579],
bearing: 150,
zoom: 15,
pitch: 0
},
'3': {
bearing: 90,
center: [-74.4019845, 4.3297718],
zoom: 13,
speed: 0.6,
pitch: 40
},
'4': {
bearing: 90,
center: [-74.4075569, 4.3295705],
zoom: 12.3
},
'5': {
bearing: 45,
center: [74.3748373, 4.3329439],
zoom: 15.3,
pitch: 20,
speed: 0.5
}
};



  // Ubicacion conjunto : MULTIFAMILIAR MIRADOR DE KATALEYA
  const marker1 = new mapboxgl.Marker()
  .setLngLat([-74.3665413, 4.3300473])
  .addTo(map);
   
  
  
 // Ubicacion conjunto : CONJUNTO RESIDENCIAL PARQUE LOS CAMBULOS I - TORRE 1 Y 2
  const marker2 = new mapboxgl.Marker()
  .setLngLat([-74.4077949, 4.3254579])
  .addTo(map);
   
  
 // Ubicacion conjunto : CONJUNTO RESIDENCIAL PARQUE LOS CAMBULOS III - TORRE 3 
  const marker3 = new mapboxgl.Marker()
  .setLngLat([-74.4019845, 4.3297718])
  .addTo(map);



  // Ubicacion conjunto : CONJUNTO RESIDENCIAL LAS HELICONIAS
  const marker4 = new mapboxgl.Marker()
  .setLngLat([-74.4075569, 4.3295705])
  .addTo(map);


   // Ubicacion conjunto : CONJUNTO RESIDENCIAL TORRES DE SANTA ANA No. 1
   const marker5 = new mapboxgl.Marker()
   .setLngLat([-74.3748373, 4.3329439])
   .addTo(map);


 
let activeChapterName = 'baker';
function setActiveChapter(chapterName) {
if (chapterName === activeChapterName) return;
 
map.flyTo(chapters[chapterName]);
 
document.getElementById(chapterName).classList.add('active');
document.getElementById(activeChapterName).classList.remove('active');
 
activeChapterName = chapterName;
}
 
function isElementOnScreen(id) {
const element = document.getElementById(id);
const bounds = element.getBoundingClientRect();
return bounds.top < window.innerHeight && bounds.bottom > 0;
}
 
// On every scroll event, check which element is on screen
window.onscroll = () => {
for (const chapterName in chapters) {
if (isElementOnScreen(chapterName)) {
setActiveChapter(chapterName);
break;
}
}
};