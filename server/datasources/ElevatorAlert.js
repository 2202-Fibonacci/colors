const { RESTDataSource } = require('apollo-datasource-rest');
const https = require("https");
const APIkey = require('../../.env')
const AlertURI =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fnyct_ene.json";
const equipmentURI =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fnyct_ene_equipments.json";

class ElevatorAlert extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fnyct_ene.json"
    }
    async getElevatorAlerts(stationId) {
        // get station name by id
        const stationName = await this.getStationName(stationId);
      
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

    async getStationName(stationId) {
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
}

module.exports = ElevatorAlert