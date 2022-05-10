// import {
//     ApolloClient, 
//     gql, 
//     ApolloProvider, 
//     InMemoryCache} from '@apollo/client';
  
  
  
//   const client = new ApolloClient({
//     link: 'http://localhost:4000/graphql',
//     cache: new InMemoryCache()
//   })
  
//   client
//     .query({
//         query: gql`
//             query TestQuery {
//                 stationInfo(stationId:101){
//                     name
//                 }
//             }
//         `
//     })
//     .then(result => console.log(result))
import react from 'react';

    const Test = () => {
        return (((
            <div>
                <p>MTA world</p>
            </div>
        )))
    }

    export default Test

//    import { StyleSheet, Text, View } from "react-native";
//     import Test from './client/components/Test'
//     import {
//       gql, 
//       ApolloProvider, 
//       createHttpLink,
//       InMemoryCache} from '@apollo/client';
//     import {ApolloClient} from '@apollo/client';
//     import ArrivalTimes from './client/components/ArrivalTimes'
//     import GetStation from './client/components/GetStation'
    
//     const httpLink = createHttpLink({
//       uri: 'http://localhost:4000'
//     });
    
//     const client = new ApolloClient({
//       link: httpLink,
//       cache: new InMemoryCache()
//     })
    
    // client
    //   .query({
    //       query: gql`
    //           query {
    // 	          stationInfo(stationId:"101"){
    //               name
    //                 }
    //               }
    //       `
    //   })
    //   .then(result => console.log(result))
    
    
    export default function App() {
        return (
          <View style={styles.container}>
            <Text>Hello World!</Text>
              <ApolloProvider client={client}>
                <GetStation />
              </ApolloProvider>
            <StatusBar style="auto" />
          </View>
        );