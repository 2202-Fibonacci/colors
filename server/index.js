const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const fs = require("fs");
const path = require("path");
const tripFeedURL =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs";
const resolvers = require("../server/resolvers.js");
const { RESTDataSource } = require("apollo-datasource-rest");
const APIkey = require("../.env");
const { baseURI, URIs } = require("../MTA/data");
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");
const https = require("https");
// const allStations = require("../MTA/stations_test")
//TODO do we need dataloader since we are not really using DataSource? maybe at our level it doesn't matter?
//dataloader, to "batch and de-dupe requests"

class TripFeed extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = tripFeedURL;
  }
  //code block below kept for testing purposes, but commented so that is does not affect functioning methods
  // willSendRequest(request){
  //     request.headers.set('x-api-key', APIkey )
  // }
  async checkURL() {
    //checkURL will only work if willSendRequest is enabled
    let chunk = await this.get("/");
    return JSON.stringify(chunk);
  }

  async getStatusFeed(train) {
    return new Promise((resolve, reject) => {
      if (URIs[String(train) === undefined]) {
        return [];
      }
      const FeedURI = this.baseURL + URIs[train.toUpperCase()];
      https
        .get(FeedURI, { headers: { "x-api-key": APIkey } }, (res) => {
          let data = [];
          res.on("data", (chunk) => {
            data.push(chunk);
          });
          res.on("end", () => {
            data = Buffer.concat(data);
            const feed =
              GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(data);
            resolve(feed);
          });
        })
        .on("error", (err) => {
          console.log("Error: " + err.message);
          reject(err);
        });
    });
  }

  async getStatus(train, direction = "NS") {
    const feed = await this.getStatusFeed(train);

    let trips = feed.entity
      .filter((entity) => entity.tripUpdate)
      .filter((update) => train.includes(update.tripUpdate.trip.routeId))
      .map((trip) => {
        const tripId = trip.tripUpdate.trip.tripId;
        const firstStop = trip.tripUpdate.stopTimeUpdate[0];
        const direction = firstStop
          ? firstStop.stopId[firstStop.stopId.length - 1]
          : "";
        const tripObj = {
          tripId,
          direction,
          stops: trip.tripUpdate.stopTimeUpdate,
        };
        return tripObj;
      });
    trips = trips.filter((trip) => direction.includes(trip.direction));

    const status = {
      routeId: train.toUpperCase(),
      trips,
    };
    return status;
  }

  async getArrivalTimes(station, train, direction = "NS") {
    const status = await this.getStatus(train, direction.toUpperCase());

    let nextArrivals = status.trips.map((trip) => {
      const { tripId, direction } = trip;
      const arrivalTime = trip.stops
        .filter((stop) => stop.stopId.includes(station))
        .map((stop) =>
          Math.round(
            Math.max(
              0,
              (stop.arrival.time - Math.floor(Date.now() / 1000)) / 60
            )
          )
        )[0];
      return { tripId, direction, arrivalTime };
    });

    nextArrivals = nextArrivals
      .filter((arrival) => arrival.arrivalTime)
      .sort((a, b) => (a.arrivalTime > b.arrivalTime ? 1 : -1));

    const arrivals = {
      routeId: train,
      stationId: station,
      nextArrivals,
    };

    const nextTrain = nextArrivals.map((train) => train.arrivalTime);

    // consolelog is correct but
    // console.log(nextTrain)
    // return nextTrain[0]
    // return nextTrain
    return arrivals;
    // return JSON.stringify(arrivals)
  }
  // getStationById(stationId){
  //   return {
  //     id: stationId,
  //     name: allStations[stationId].stop_name,
  //     lat: allStations[stationId].stop_lat,
  //     lon: allStations[stationId].stop_lon,
  //     borough: allStations[stationId].borough,
  //     accessible: allStations[stationId].accessible,
  //     trainLines: JSON.stringify(allStations[stationId].lines_at)
  //   }
  // }
  // getTrainsByStation(stationId){
  //   return {
  //     trainLines: allStations[stationId].lines_at
  //   }
  // }
  // getStationByName(stationName){
  //   for(let station in allStations){
  //     let stationInfo = allStations[station]
  //     for(let info in stationInfo){
  //       let datapoint = stationInfo[info]
  //       if(datapoint === stationName){
  //         let id = stationInfo.stop_id
  //         console.log(id)
  //         return this.getStationById(id)
  //       }
  //     }
  //   }
  // }
  // getStationByLatAndLong(lat, long){
  //   for(let station in allStations){
  //     let stationInfo = allStations[station]
  //     for(let info in stationInfo){
  //       let datapoint = stationInfo[info]
  //       if(datapoint === String(lat)){
  //         console.log(datapoint, stationInfo.stop_lon)
  //         if(stationInfo.stop_lon === String(long)){
  //           let id = stationInfo.stop_id
  //           return this.getStationById(id)
  //         }
  //       }
  //     }
  //   }
  // }
}

const server = new ApolloServer({
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  dataSources: () => ({
    tripFeed: new TripFeed(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚍 JML server ready at ${url}`);
});

// mapping out object returned
// DATA  {
//               "__typename": "TripUpdate",
//               "nextArrivals":
//               [{"__typename": "Arrival", "arrivalTime": 6},
//               {"__typename": "Arrival", "arrivalTime": 14},
//               {"__typename": "Arrival", "arrivalTime": 22},
//               {"__typename": "Arrival", "arrivalTime": 30}]}
