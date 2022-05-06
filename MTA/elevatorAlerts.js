const APIkey = require("../.env");
const AlertURI =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fnyct_ene.json";
const https = require("https");

// get all elevator and escalator outages for a specific station
function getElevatorAlerts(station) {
  return new Promise((resolve, reject) => {
    https
      .get(AlertURI, { headers: { "x-api-key": APIkey } }, (resp) => {
        let data = [];
        resp.on("data", (chunk) => {
          data.push(chunk);
        });
        resp.on("end", () => {
          data = Buffer.concat(data);
          const feed = JSON.parse(data.toString());

          // filter alerts for specified station
          const alerts = feed.filter(
            (alert) =>
              alert.station === station && alert.isupcomingoutage === "N"
          );

          resolve(alerts);
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
        reject(err);
      });
  });
}

// -> pass in station name (not id), returns filtered list of current elevator and escalator outages
Promise.resolve(getElevatorAlerts("Atlantic Av-Barclays Ctr")).then((alerts) =>
  console.log(alerts)
);

// e.g.
// {
//     station: 'Atlantic Av-Barclays Ctr',
//     borough: 'BKN',
//     trainno: 'B/D/N/Q/R/2/3/4/5/LIRR',
//     equipment: 'ES358X',
//     equipmenttype: 'ES',  --> ES = escalator, EL = elevator
//     serving: 'Barclays Center plaza (SE corner of Atlantic Ave & Flatbush Ave) to mezzanine for B/Q service and access to Manhattan-bound 2/3, 4/5, and rest of complex',
//     ADA: 'N',
//     outagedate: '05/05/2022 03:00:00 PM',
//     estimatedreturntoservice: '05/07/2022 11:00:00 PM',
//     reason: 'Repair',
//     isupcomingoutage: 'N',
//     ismaintenanceoutage: 'N'
//   },
