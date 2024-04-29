// import './fetchFuncs'



// LEAFLET MÄPPI KOODI
const map = L.map('map').setView([60.223831106748996, 24.758107289511884], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([60.223831106748996, 24.758107289511884]).addTo(map)
    .bindPopup('KARAMALMI JAUUUU')
    .openPopup();
// -----