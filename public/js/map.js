mapboxgl.accessToken =
  "pk.eyJ1Ijoia2Rhdmlkcm9jaGEiLCJhIjoiY2w0N2ZrMnVpMDAxYzNidDdibDE4dXBjaCJ9.OcgF2O72ox3dK-JNpnV8nQ";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-74.3610158, 4.343664], //puntos localizacion fusa
  zoom: 13.5,
  bearing: 37,
  pitch: 50,
});

const chapters = {
  1: {
    bearing: 27,
    center: [-74.3665299, 4.3300493],
    zoom: 15.5,
    pitch: 20,
  },
  2: {
    duration: 6000,
    bearing: 27,
    center: [-74.3704877, 4.3301063],
    zoom: 15.5,
    pitch: 20,
  },
  3: {
    duration: 6000,
    bearing: 27,
    center: [-74.4077949, 4.3254632],
    zoom: 15.5,
    pitch: 20,
  },
  4: {
    duration: 6000,
    bearing: 27,
    center: [-74.4079625, 4.328368],
    zoom: 15.5,
    pitch: 20,
  },
  5: {
    duration: 6000,
    bearing: 27,
    center: [-74.3661865, 4.3387761],
    zoom: 15.5,
    pitch: 20,
  },

  6: {
    duration: 6000,
    bearing: 27,
    center: [-74.3652779, 4.3231539],
    zoom: 15.5,
    pitch: 20,
  },

  7: {
    duration: 6000,
    bearing: 27,
    center: [-74.3985085, 4.331261],
    zoom: 15.5,
    pitch: 20,
  },

  8: {
    duration: 6000,
    bearing: 27,
    center: [-74.4046497, 4.3266667],
    zoom: 15.5,
    pitch: 20,
  },

  9: {
    duration: 6000,
    bearing: 27,
    center: [-74.3658937, 4.3251099],
    zoom: 15.5,
    pitch: 20,
  },

  10: {
    duration: 6000,
    bearing: 27,
    center: [-74.371529, 4.3406173],
    zoom: 15.5,
    pitch: 20,
  },

  11: {
    duration: 6000,
    bearing: 27,
    center: [-74.3588279, 4.3445312],
    zoom: 15.5,
    pitch: 20,
  },
};

// Ubicacion conjunto : MULTIFAMILIAR MIRADOR DE KATALEYA
const marker1 = new mapboxgl.Marker()
  .setLngLat([-74.3665299, 4.3300493])
  .addTo(map);

// Ubicacion conjunto : TORRES DE BALMORAL

const marker2 = new mapboxgl.Marker()
  .setLngLat([-74.3704877, 4.3301063])
  .addTo(map);

// Ubicacion conjunto : CONJUNTO RESIDENCIAL PARQUE LOS CAMBULOS I - TORRE 1 Y 2
const marker3 = new mapboxgl.Marker()
  .setLngLat([-74.4077949, 4.3254632])
  .addTo(map);

// Ubicacion conjunto : CONJUNTO RESIDENCIAL PARQUE LOS CAMBULOS III - TORRE 3
const marker4 = new mapboxgl.Marker()
  .setLngLat([-74.4079625, 4.328368])
  .addTo(map);

// Ubicacion conjunto : CONJUNTO ARACAURIA
const marker5 = new mapboxgl.Marker()
  .setLngLat([-74.3661865, 4.3387761])
  .addTo(map);

// Ubicacion conjunto : CONJUNTO CERRADO URBANIZACION BRISAS DE MIRAMONTE
const marker6 = new mapboxgl.Marker()
  .setLngLat([-74.3652779, 4.3231539])
  .addTo(map);

// Ubicacion conjunto : CONJUNTO LAS HELICONIAS
const marker7 = new mapboxgl.Marker()
  .setLngLat([-74.3985085, 4.331261])
  .addTo(map);

// Ubicacion conjunto : CONJUNTO RESIDENCIAL TORRES DE SANTA ANA No. 1
const marker8 = new mapboxgl.Marker()
  .setLngLat([-74.4046497, 4.3266667])
  .addTo(map);

// Ubicacion conjunto : MULTIFAMILIARES EL PORTAL DE LA PAMPA V.I.S.
const marker9 = new mapboxgl.Marker()
  .setLngLat([-74.3658937, 4.3251099])
  .addTo(map);

// Ubicacion conjunto : MULTIFANILIAR VILLA LAURA
const marker10 = new mapboxgl.Marker()
  .setLngLat([-74.371529, 4.3406173])
  .addTo(map);

// Ubicacion conjunto : CONJUNTO KADY
const marker11 = new mapboxgl.Marker()
  .setLngLat([-74.3588279, 4.3445312])
  .addTo(map);

let activeChapterName = "baker";
function setActiveChapter(chapterName) {
  if (chapterName === activeChapterName) return;

  map.flyTo(chapters[chapterName]);

  document.getElementById(chapterName).classList.add("active");
  document.getElementById(activeChapterName).classList.remove("active");

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
