const { ApolloServer } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const fs = require('fs');
const path = require('path');
const resolvers = require('./resolvers/index.js')
const ServiceAlert = require('./datasources/ServiceAlert')
const TripFeed = require("./datasources/TripFeed")
const ElevatorAlert = require("./datasources/ElevatorAlert")
//TODO do we need dataloader since we are not really using DataSource? maybe at our level it doesn't matter?
//dataloader, to "batch and de-dupe requests"


const server = new ApolloServer({
    playground: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
            'utf8'
        ),
    resolvers,
    dataSources: () => ({
        tripFeed: new TripFeed(),
        alertFeed: new ServiceAlert(),
        elevatorFeed: new ElevatorAlert()
    })
})

server.listen().then(({ url }) => {
  console.log(`🚍 JML server ready at ${url}`);
});

