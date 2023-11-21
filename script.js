

function initialize() {
  var earth = new WE.map('earth_div');
  WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(earth);

  const ISS_API_URL = 'https://api.wheretheiss.at/v1/satellites/25544';

  // Marcador personalizado representando a ISS
  var issIcon = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fe7.pngegg.com%2Fpngimages%2F778%2F344%2Fpng-clipart-satellite-ry-transmission-information-signal-angle-electronics.png&tbnid=duehwcOlFY0ADM&vet=12ahUKEwiP_azagNWCAxUJrZUCHX_zDVwQMyglegUIARCbAQ..i&imgrefurl=https%3A%2F%2Fwww.pngegg.com%2Fpt%2Fsearch%3Fq%3Dimagens%2Bde%2Bsat%25C3%25A9lite&docid=HIWycNNlDbpxKM&w=900&h=899&q=imagem%20png%20de%20sat%C3%A9lite&client=avast-a-1&ved=2ahUKEwiP_azagNWCAxUJrZUCHX_zDVwQMyglegUIARCbAQ';
  const marker = WE.marker([0, 0], issIcon, 50, 50).addTo(earth);


  function fetchData() {
    fetch(ISS_API_URL)
      .then(response => response.json())
      .then(data => {
        const { latitude, longitude,altitude, velocity } = data;

        // Atualiza as coordenadas do marcador da ISS
        marker.setLatLng([latitude, longitude]);
        earth.setView([latitude, longitude], 2);
        document.getElementById('lat').innerHTML = latitude + '°';
        document.getElementById('lon').innerHTML = longitude + '°';
        document.getElementById('vel').innerHTML = Math.round(velocity) + ' Km/H';
        document.getElementById('alt').innerHTML = altitude;
      })
      .catch(error => console.error('Erro ao obter dados da ISS:', error));
  }



  fetchData(); // Obtém dados pela primeira vez ao carregar a página

  setInterval(fetchData, 5000); // Atualização a cada 5 segundos (5000 milissegundos)
}
