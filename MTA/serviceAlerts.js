const APIkey = require("../.env");
const AlertURI =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts.json";
const https = require("https");

// get all subway service alerts for a specific train line
function getAllServiceAlerts(trainLine, onlyActive = false) {
  https
    .get(AlertURI, { headers: { "x-api-key": APIkey } }, (resp) => {
      let data = [];
      resp.on("data", (chunk) => {
        data.push(chunk);
      });
      resp.on("end", () => {
        data = Buffer.concat(data);
        const feed = JSON.parse(data.toString());

        // iterate through all entities to find alerts for specified trainLine
        let alerts = [];
        feed.entity.forEach((entity) => {
          if (
            entity.alert &&
            entity.alert.header_text.translation[0].text.includes(
              `[${trainLine}]`
            )
          ) {
            // check if there is alert text content
            const active =
              entity.alert["transit_realtime.mercury_alert"]
                .human_readable_active_period;
            const activePeriodText = active ? active.translation[0].text : "";
            alerts.push({
              type: entity.alert["transit_realtime.mercury_alert"].alert_type,
              text: entity.alert.header_text.translation[0].text,
              activePeriod: entity.alert.active_period,
              activePeriodText,
            });
          }
        });

        // optionally filter for currently active alerts
        if (onlyActive) {
          alerts = alerts.filter((alert) => {
            const activeAlerts = alert.activePeriod.filter((period) => {
              return (
                Math.round(Date.now() / 1000) > period.start &&
                Math.round(Date.now() / 1000) < period.end
              );
            });
            return activeAlerts.length > 0;
          });
        }

        let serviceAlerts = { routeId: trainLine, alerts };
        console.log(serviceAlerts);
        return serviceAlerts;
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}

getAllServiceAlerts("B", true); // -> optional second parameter to filter by currently active alerts (true or false)
