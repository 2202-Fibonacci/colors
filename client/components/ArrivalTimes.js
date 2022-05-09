import React, {useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import allStations from "../../MTA/stations_test"
// import getArrivalTimes from "../../MTA/arrivalTimes_test"


const STATION_NAME = gql `
    {
        stationInfo(stationId:$stationId){
            name
        }
    }
`

const NEXT_ARRIVALS = gql `
    query ArrivalsQuery(
        $stationId: String!
        $train: String!
        $direction: String
    ) { 
        arrivalTimes(stationId:$stationId, train:$train, direction:$direction){
            stationId
            train   
            direction
        }
    }
`

// class Station {
//     constructor(stationId){
//         this.stationId = stationId,
//         this.stationName = allStations[stationId].stop_name
//         this.trainLines = allStations[stationId].lines_at
//     }
    
//     arrivalTimes(line, direction){
//         try{
//             let times = getArrivalTimes(this.stationId, line, direction)
//             return times;
//         }
//         catch (err){
//             console.log(err)
//         }
//         // return getArrivalTimes(this.stationId, line, direction)
//     }
//     getTrains(){
//         return allStations[this.stationId].lines_at
//     }
// }



const ArrivalTimes = () => {

    const { stationName } = useQuery(STATION_NAME)
    const [stationId, setStationId ]= useState('')
    const [submitted, setSubmitted] = useState(false)
    // const [stationName, setStationName] = useState('')
    const [stationTrains, setStationTrains] = useState([])
    const [train, setTrain ] = useState('')
    const [direction, setDirection ] = useState('')

    const handleSubmit = event => {
        event.preventDefault;
        // const station = new Station(stationId)
        // const name = station.stationName
        // const trains = station.getTrains()
        // setStationId(event.target.value)
        setSubmitted(true)
        let stringed = String(event.target.value)
        setStationId(stringed)
        // setStationName(allStations[stationId].stop_name)
        setStationTrains(allStations[stationId].lines_at)
    }

    const handleChange = event =>{
        let stringed = String(event.target.value)
        setStationId(stringed)
    }

    const {loading, error, data }= useQuery( NEXT_ARRIVALS, {
        variables: {
            stationId: stationId,
            train: train,
            direction: direction
        }
    })


    return (
        <div>
            <p>Arrival Times</p>
                <form onSubmit={handleSubmit}>
                <label htmlFor="stationId">StationId:</label>
                <input name="stationId" onChange={handleChange} value={stationId} />
                <button type="input">Submit</button>
                </form>
                {stationId && <Text>{stationName}</Text>}
                {stationId && <Text>Select train:</Text>}
                {stationId && (
                    <div>
                        {stationTrains.map((train, index)=> (
                            <div key = {index}>
                               <button>{train}</button>
                            </div>
                        ))}
                    </div>
                )}
                <QueryResult error={error} loading={loading} data={data}>
                    
                </QueryResult>

        </div>
    )
}


export default ArrivalTimes;