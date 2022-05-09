import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Test from './client/components/Test'
import {
  gql, 
  ApolloProvider, 
  createHttpLink,
  InMemoryCache} from '@apollo/client';
import {ApolloClient} from '@apollo/client';
import ArrivalTimes from './client/components/ArrivalTimes'
import GetStation from './client/components/GetStation'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderWeight: "10px",
    borderColor: "#00ffff",
    // color: "#00ffff", //Laurynn changed for readability of forms
    margin: "10px",
    alignItems: "center",
    justifyContent: "center",
    color: '#000000', //Laurynn changed for readability of forms
  },
});
