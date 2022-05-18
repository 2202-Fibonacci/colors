
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Screens
import Map from "./Map";
import Login from "./Login";
import Profile from "./Profile";

//Screen names
const mapName = "Map";
const loginName = "Login";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
        <Tab.Navigator
          initialRouteName={mapName}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;

              if (rn === mapName) {
                iconName = focused ? 'map' : 'map-outline';

              } else if (rn === loginName) {
                iconName = focused ? 'person' : 'person-outline';

              } else if (rn === profileName) {
                iconName = focused ? 'locate' : 'locate-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeBackgroundColor: "#000",
            inactiveBackgroundColor: "#000",
            activeTintColor: '#eeff00',
            inactiveTintColor: 'grey',
            labelStyle: { paddingBottom: 10, fontSize: 10 },
            style: { padding: 10, height: 70}
          }}>

          <Tab.Screen name={mapName} component={Map} />
          <Tab.Screen name={loginName} component={Login} />
          <Tab.Screen name={profileName} component={Profile} />

        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default MainContainer;

// {
//   "tabBarActiveTintColor": "tomato",
//   "tabBarInactiveTintColor": "grey",
//   "tabBarLabelStyle": {
//     "paddingBottom": 10,
//     "fontSize": 10
//   },
//   "tabBarStyle": [
//     {
//       "display": "flex"
//     },
//     null
//   ]
// }
