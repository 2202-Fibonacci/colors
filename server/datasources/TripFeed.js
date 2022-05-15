const { RESTDataSource } = require("apollo-datasource-rest");
const { URIs } = require("../../MTA/data");
const tripFeedURL =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs";
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");
const https = require("https");
const allStations = require("../../MTA/stations");

class TripFeed extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = tripFeedURL;
  }

  async getStatusFeed(train) {
    return new Promise((resolve, reject) => {
      if (URIs[String(train) === undefined]) {
        return [];
      }
      const FeedURI = this.baseURL + URIs[train.toUpperCase()];
      https
        .get(
          FeedURI,
          { headers: { "x-api-key": process.env.API_KEY } },
          (res) => {
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
          }
        )
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
        .filter((stop) => stop.stopId.includes(station) && stop.arrival)
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

    return arrivals;
  }

  async getStationUpdate(station) {
    const lines = allStations[station].lines_at;
    const updates = lines.map(
      async (line) => await this.getArrivalTimes(station, line)
    );
    return updates;
  }
}

module.exports = TripFeed;
