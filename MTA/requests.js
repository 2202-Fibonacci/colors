const APIkey = "8aAhU6jgEp4UOhS54yEbK9STXo6mA7sM4wfA5kLy";
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
          console.log("Receiving Data");
          data.push(chunk);
        });
        res.on("end", () => {
          data = Buffer.concat(data);
          const feed =
            GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(data);
          console.log("Finished receiving data");
          resolve(feed);
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  });
}

// get status of next arrivals for my train
async function getArrivals(myTrain, myStop, direction) {
  // get status updates for my train line
  const feed = await getStatusFeed(myTrain);

  // filter feed to entries with trip updates
  const updates = feed.entity.filter((entity) => entity.tripUpdate);

  // for each update find arrivals to my station in the correct direction and push into array
  const relevantStops = [];
  updates.forEach((entity) => {
    const arrivals = entity.tripUpdate.stopTimeUpdate;
    arrivals.forEach((stop) => {
      const stopId = stop.stopId;
      const stopDir = stop.stopId[stop.stopId.length - 1];
      if (stopId.includes(myStop) && stopDir === direction) {
        relevantStops.push(stop);
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
    nextArrivalTimes.push(
      Math.round(
        Math.max(0, (arrival.arrival.time - Math.floor(Date.now() / 1000)) / 60)
      )
    );
  });

  // get name of station
  const result = await mta.stop(myStop);
  const stopName = result.stop_name;

  nextArrivalTimes.forEach((arrival, i) => {
    arrival === 0
      ? console.log(`${i + 1}: The train is arriving now`)
      : console.log(
          `${
            i + 1
          }: The ${direction}-bound ${myTrain} train will arrive at ${stopName} in ${arrival} minutes`
        );
  });
}

getNextArrivalTimes("2", "236", "N");

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
