const https = require('https');


https.get(
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts",
  { headers: { "x-api-key": 'AIzaSyBcoVAS4MQswHszUrJrOUrPv3RT8zLZT_0'}
  },
  (resp) => {
    resp.on('data', (chunk) => {
      console.log("Receiving Data");
      console.log(chunk)
    });
    resp.on('end', () => {
      console.log("Finished receiving data");
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });