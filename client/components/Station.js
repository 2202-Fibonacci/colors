import react, {useState} from "react";
import { Text, View } from "react-native";
import { useQuery, gql } from '@apollo/client';
import allStations from "../../MTA/stations_test"



const Station = (props) => {

    const { station } = props;

    return (
        <div>
            {station.name}
        </div>
    )
}

export default Station