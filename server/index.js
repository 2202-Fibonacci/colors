const { ApolloServer } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const fs = require('fs');
const path = require('path');
const tripFeedURL = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs"
const resolvers = require('../server/resolvers.js')
const { RESTDataSource } = require('apollo-datasource-rest');
const protobuf = require("@apollo/protobufjs");
const APIkey = "8aAhU6jgEp4UOhS54yEbK9STXo6mA7sM4wfA5kLy"
const { HTTPDataSource } = require('apollo-datasource-http')



class TripFeed extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = tripFeedURL;
    }
    willSendRequest(request){
        request.headers.set('x-api-key', APIkey )
    }
    async checkURL(){
        //following jennys lead, we need an array to receive the pieces
        let data = []
        let chunk = await this.get('/', undefined, {
            header: {"x-api-key": APIkey  }
        })
        // data.push(chunk)
        // data = Buffer.concat(data);
        
        return JSON.stringify(chunk)
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




// protobuf.load('../MTA/gtfs-realtime.proto', function (err, root) {
//     if (err) 
//         throw err
//     const FeedMessage = root.lookupType("transit_realtime.FeedMessage");

//     const payload = { }
// })