const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const fs = require("fs");
const path = require("path");
//instatiate pool outside your hotpath --what is hotpath? pool? TODO: research pool/hotpath
// const alertURL = '' //TODO get jennys feed
// const { Pool } = require('undici') //what is pool? undici is a strangers things reference. just sayin'
// const pool = new Pool(alertURL)
const resolvers = require("../server/resolvers.js");
const { HTTPDataSource } = require("apollo-datasource-http");
// const { BaseRedisCache } = require('apollo-server-cache-redis'); //TODO: laurynn research/configure
// const Redis = require('ioredis');
// const PORT=  process.env.PORT || 4000; //not necessary for now

// data source class
// const alertdata = new (class AlertAPI extends HTTPDataSource{
//     constructor(alertURL: St)
// } )

const server = new ApolloServer({
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  // dataSource: () => {
  //     return {
  //         alertAPI: new AlertAPI(alertURL, pool)
  //     }
  // }
});

server.listen().then(({ url }) => {
  console.log(`🚍 JML server ready at ${url}`);
});
