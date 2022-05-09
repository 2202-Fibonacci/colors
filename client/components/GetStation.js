import react, {useState} from "react";
import { Text, View } from "react-native";
import { useQuery, gql } from '@apollo/client';
import allStations from "../../MTA/stations_test";
import Station from "./Station";

const stations = [
    {
        id: '101',
        name: 'Test1'
    },
    {
        id: '102',
        name: 'Test2'
    }
  ];

const GetStation = () => {
    const [station, setStation] = useState('')

    return (
        <div>
            <Text>Stations</Text>
            <div>
                {stations.map((station) => 
                <Station key={station.id} station={station} />
                )}
            </div>
        </div>
    )
}

export default GetStation