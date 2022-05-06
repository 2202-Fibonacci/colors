const APIkey = require("../.env");
const baseURI =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs";
const URIs = {
  A: "-ace",
  C: "-ace",
  E: "-ace",
  G: "-g",
  N: "-nqrw",
  Q: "-nqrw",
  R: "-nqrw",
  W: "-nqrw",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  B: "-bdfm",
  D: "-bdfm",
  F: "-bdfm",
  M: "-bdfm",
  J: "-jz",
  Z: "-jz",
  L: "-l",
  SIR: "-si",
};

const Mta = require("mta-gtfs");
const mta = new Mta({
  key: APIkey,
});

const GtfsRealtimeBindings = require("gtfs-realtime-bindings");
const https = require("https");

// get real time status feed for trainline passed in as parameter
async function getStatusFeed(trainLine) {
  return new Promise((resolve, reject) => {
    const FeedURI = baseURI + URIs[trainLine.toUpperCase()];
    https
      .get(FeedURI, { headers: { "x-api-key": APIkey } }, (res) => {
        let data = [];
        res.on("data", (chunk) => {
          //   console.log("Receiving Data");
          data.push(chunk);
        });
        res.on("end", () => {
          data = Buffer.concat(data);
          const feed =
            GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(data);
          //   console.log("***Finished receiving data***");
          resolve(feed);
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
        reject(err);
      });
  });
}

// get status of next arrivals for my train
async function getArrivals(myTrain, myStop, direction = "NS") {
  // array of trains [e.g. N,1,2]
  // for each train, get dict value => nqrq, ''
  // for each value, fetch feed
  // filter based on whole array

  // get all status updates for my train line
  const feed = await getStatusFeed(myTrain);
  //   printAlerts(feed);

  // filter feed to entries with trip updates
  const updates = feed.entity
    .filter((entity) => entity.tripUpdate)
    .filter((update) => myTrain.includes(update.tripUpdate.trip.routeId));

  // for each update find arrivals to my station in the correct direction and push into array
  const relevantStops = [];
  updates.forEach((entity) => {
    const arrivals = entity.tripUpdate.stopTimeUpdate;
    arrivals.forEach((stop) => {
      const stopId = stop.stopId;
      const stopDir = stop.stopId[stop.stopId.length - 1];
      if (stopId.includes(myStop) && direction.includes(stopDir)) {
        relevantStops.push({ stop, train: myTrain, direction: stopDir });
      }
    });
  });

  return relevantStops;
}

// get time until next arrivals for my train
async function getNextArrivalTimes(myTrain, myStop, direction) {
  // get all arrivals for which there is a status update
  const arrivals = await getArrivals(myTrain, myStop, direction);

  // populate array of time until arrival in minutes
  let nextArrivalTimes = [];
  arrivals.forEach((arrival) => {
    const time =
      (arrival.stop.arrival.time - Math.floor(Date.now() / 1000)) / 60;
    nextArrivalTimes.push({
      time: Math.round(Math.max(0, time)),
      train: arrival.train,
      direction: arrival.direction,
    });
  });

  // get name of station
  const result = await mta.stop(myStop);
  const stopName = result.stop_name;

  // log upcoming arrival times in order
  nextArrivalTimes.sort((a, b) => a.time - b.time);
  nextArrivalTimes.forEach((arrival, i) => {
    arrival.time === 0
      ? console.log(`${i + 1}: **The ${arrival.train} train is arriving now**`)
      : console.log(
          `${i + 1}: The ${arrival.direction}-bound ${
            arrival.train
          } train will arrive at ${stopName} in ${arrival.time} minutes`
        );
  });
  return nextArrivalTimes;
}

const trains = ["2"];
trains.forEach(async (train) => {
  await getNextArrivalTimes(train, "236", "N");
  console.log("<<<<<>>>>>>");
}); // optional direction N or S

// getNextArrivalTimes("3", "236", "N");
// setInterval(() => getNextArrivalTimes("2", "236", "S"), 20000);

// get alerts on the trainline
function printAlerts(feed) {
  // print all alerts for the route
  feed.entity.forEach((entity) => {
    if (entity.alert) {
      console.log(
        "ALERT:",
        entity.alert.headerText.translation[0].text,
        "on this route"
      );
    }
  });
}

// get all subway service alerts
const AlertURI =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts.json";

function getAllServiceAlerts() {
  https
    .get(AlertURI, { headers: { "x-api-key": APIkey } }, (resp) => {
      let data = [];
      resp.on("data", (chunk) => {
        data.push(chunk);
      });
      resp.on("end", () => {
        data = Buffer.concat(data);
        const feed = JSON.parse(data.toString());
        feed.entity.forEach((entity, i) => {
          if (entity.alert) {
            console.log(
              `${i + 1}: ${
                entity.alert["transit_realtime.mercury_alert"].alert_type
              } - ${entity.alert.header_text.translation[0].text}`
            );
          }
        });
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}

// getAllServiceAlerts();

// // gets ids, name, lat/long for all subway stops
// mta
//   .stop()
//   .then(function (result) {
//     console.log(result);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

////////////////////////////////////////////
//--> alternative way to fetch the feed

// package transit_realtime;
// syntax = "proto2";
// message FeedMessage
// header FeedHeader

// const axios = require("axios");
// const path = require("path");
// const protobuf = require("protobufjs");

// async function getStatusFeedAlt(train) {
//   const FeedURI = baseURI + URIs[train];
//   const file = path.resolve(__dirname + "/gtfs-realtime.proto");
//   const root = await protobuf.load(file);
//   const transit = root.lookupType("transit_realtime.FeedMessage");

//   try {
//     const response = await axios.get(
//       FeedURI,
//       {
//         headers: { "x-api-key": APIkey },
//       },
//       { responseType: "arraybuffer" }
//     );

//     console.log(response.status);
//     // console.log(response.data.length);
//     // console.log(Buffer.from(response.data));
//     // // const buffer = new Uint8Array(response.data);
//     // const msg = transit.decode(Buffer.from(response.data));
//   } catch (err) {
//     console.log("ERROR", err.message);
//   }
// }

// getStatusFeedAlt("L");
