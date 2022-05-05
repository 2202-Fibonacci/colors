const GtfsRealtimeBindings = require("gtfs-realtime-bindings");
const https = require("https");
const APIkey = "8aAhU6jgEp4UOhS54yEbK9STXo6mA7sM4wfA5kLy";
const FeedURI =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw"; // L-train real time endpoint

// real time status feeds
https
  .get(FeedURI, { headers: { "x-api-key": APIkey } }, (resp) => {
    let data = [];
    resp.on("data", (chunk) => {
      console.log("Receiving Data");
      data.push(chunk);
    });
    resp.on("end", () => {
      data = Buffer.concat(data);
      const feed =
        GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(data);
      console.log("Finished receiving data");
      feed.entity.forEach((entity) => {
        if (entity.tripUpdate) {
          const tripArrivals = entity.tripUpdate.stopTimeUpdate; // array of future stops, reflects delay times in seconds
          // console.log(tripArrivals); // first element is the current station
          // if stopid == mystop, add to relevant stops array. Note N or S. station.arrival.time, calculate time from now if positive, current station
        }
        // if (entity.alert) {
        //   console.log(entity.alert);
        //   console.log(entity.alert.headerText.translation[0].text);
        // }
      });
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });

// all service alerts
// const AlertURI =
//   "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fall-alerts.json";
// subway service alerts
const AlertURI =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts.json";

https
  .get(AlertURI, { headers: { "x-api-key": APIkey } }, (resp) => {
    let data = [];
    resp.on("data", (chunk) => {
      // console.log("Receiving Data");
      data.push(chunk);
    });
    resp.on("end", () => {
      data = Buffer.concat(data);
      const feed = JSON.parse(data.toString());
      // console.log(feed);
      // console.log("Finished receiving data");
      // console.log("ALERT", feed.entity[0].alert);
      // feed.entity.forEach((entity) => {
      //   if (entity.alert) {
      //     console.log(
      //       entity.alert["transit_realtime.mercury_alert"].alert_type
      //     );
      //   }
      // });
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });

// var parser = require("./parsers");
const Mta = require("mta-gtfs");
const mta = new Mta({
  key: APIkey,
  feed_id: 1, // optional, default = 1
});

// gets ids, name, lat/long for all subway stops
// mta
//   .stop()
//   .then(function (result) {
//     console.log(result);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// gets info for a specific stop from id or array of ids
mta.stop("S16").then(function (result) {
  console.log(result);
});

// get status for all service types (subway, bus, etc.)
// mta.status().then(function (result) {
//   console.log(result);
// });

// get status for a specific service type
// mta.status("subway").then(function (result) {
//   console.log(result);
// });

// real-time subway schedule data with stop id or array of ids and optional feedid
// mta.schedule(635, 1).then(function (result) {
//   console.log(result);
// });
