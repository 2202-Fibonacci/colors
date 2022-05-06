const { ApolloServer } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const fs = require('fs');
const path = require('path');
const tripFeedURL = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs"
const resolvers = require('../server/resolvers.js')
const { RESTDataSource } = require('apollo-datasource-rest');
const APIkey = require('../.env')
const { baseURI, URIs } = require("../MTA/data")
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");
const https = require("https");


class TripFeed extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = tripFeedURL;
    }
    // willSendRequest(request){
    //     request.headers.set('x-api-key', APIkey )
    // }
    async checkURL(){
        // let chunk = await this.get('/', undefined, {
        //     header: {"x-api-key": APIkey  }
        // })
        let chunk = await this.get('/')
        return JSON.stringify(chunk)
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
                //    let stringed = JSON.stringify(feed)
                  resolve(feed);
                });
              })
              .on("error", (err) => {
                console.log("Error: " + err.message);
                reject(err);
              });
          });
        
            // const URI = URIs[train.toUpperCase()];
            // const chunk = await this.get(`${URI}`)
            //     // let data = [];
            //     // data.push(chunk)
            //     // data = Buffer.concat(data);
            //     console.log(chunk)
            //     let data = Buffer.from(chunk)
            //     const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(data);
            //     return feed
       
    }

      async getStatus(train, direction = "NS"){
          const feed = await this.getStatusFeed(train)
          console.log(feed.entity)

          let trips = feed.entity
            .filter((entity) => entity.tripUpdate)
            .filter((update) => train.includes(update.tripUpdate.trip.routeId))
            .map((trip) => {
                const tripId = trip.tripUpdate.trip.tripId;
                const firstStop = trip.tripUpdate.stopTimeUpdate[0];
                const direction = firstStop ? firstStop.stopId[firstStop.stopId.length -1]: "";
                const tripObj = {
                    tripId,
                    direction,
                    stops: trip.tripUpdate.stopTimeUpdate,
                };
                return tripObj
            })
            trips = trips.filter((trip)=> direction.includes(trip.direction));

            const status = {
                routeId:train.toUpperCase(),
                trips,
            };
            return status;
      }
      async getArrivalTimes(station, train, direction="NS"){
        const status = await this.getStatus(train, direction.toUpperCase());

        let nextArrivals = status.trips.map((trip)=> {
            const { tripId, direction } = trip;
            const arrivalTime = trip.stops
                .filter((stop) => stop.stopId.includes(station))
                .map((stop) => 
                    Math.round(
                        Math.max(0, (stop.arrival.time - Math.floor(Date.now()/1000)) / 60)
                    )    
                )[0];
                return {tripId, direction, arrivalTime};
            });

          nextArrivals = nextArrivals
            .filter((arrival) => arrival.arrivalTime)
            .sort((a, b) => (a.arrivalTime > b.arrivalTime ? 1 : -1))

            const arrivals = {
                routeId: train,
                stationId: station,
                nextArrivals,
            };
        
            return JSON.stringify(arrivals)
      }


}


const server = new ApolloServer({
    playground: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
            'utf8'
        ),
    resolvers,
    dataSources: () => ({
        tripFeed: new TripFeed()
    })
})

server.listen().then(({ url }) => {
    console.log(`🚍 JML server ready at ${url}`);
  });



