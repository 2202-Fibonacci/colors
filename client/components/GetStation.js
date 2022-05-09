import react, {useState} from "react";
import { Text, View } from "react-native";
import { useQuery, gql } from '@apollo/client';
import allStations from "../../MTA/stations_test";
import Station from "./Station";



const GetStation = () => {
    const [station, setStation] = useState('')

    return (
        <div>
            <Text>Stations</Text>
            <form onSubmit={(e) => {e.preventDefault()}}>
            <label htmlFor="stationId">Station Id:</label>
                <input name="stationId" onChange={(e)=> setStation(e.target.value)} placeholder='ID Here' />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default GetStation