const APIkey = require("../.env");
const AlertURI =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fnyct_ene.json";
const equipmentURI =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fnyct_ene_equipments.json";
const https = require("https");

// get all elevator and escalator outages for a specific station
async function getElevatorAlerts(stationId) {
  // get station name by id
  const stationName = await getStationName(stationId);

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

          // filter alerts feed by specified station
          const alerts = feed.filter(
            (alert) =>
              alert.station === stationName && alert.isupcomingoutage === "N"
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

// find station name by stationid number
function getStationName(stationId) {
  return new Promise((resolve, reject) => {
    https
      .get(equipmentURI, { headers: { "x-api-key": APIkey } }, (resp) => {
        let data = [];
        resp.on("data", (chunk) => {
          data.push(chunk);
        });
        resp.on("end", () => {
          data = Buffer.concat(data);
          const feed = JSON.parse(data.toString());

          // filter equipment by station id
          const equipment = feed.filter((equip) =>
            equip.elevatorsgtfsstopid.includes(stationId)
          );

          // return corresponding station name
          if (equipment[0]) {
            resolve(equipment[0].station);
          } else resolve(equipment);
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
        reject(err);
      });
  });
}

// -> pass in station id, return filtered list of current elevator and escalator outages
Promise.resolve(getElevatorAlerts("235")).then((alerts) => console.log(alerts));

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
