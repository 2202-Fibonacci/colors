import React, {useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import { gql } from '@apollo/client';
import allStations from "../../MTA/stations_test"
// import getArrivalTimes from "../../MTA/arrivalTimes_test"


//TODO for Monday: start new component that JUST does arrivalTimes in one form, not several

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


    const {stationId, setStationId} = useState('')
    const {stationName, setStationName} = useState('')
    const {trains, setTrains} = useState([])

    const handleSubmit = event => {
        event.preventDefault;
        // const station = new Station(stationId)
        // const name = station.stationName
        // const trains = station.getTrains()
        // setStationId(event.target.value)
        setStationName(allStations[stationId].stop_name)
        setTrains(allStations[stationId].lines_at)
    }

    const handleChange = event =>{
        // event.preventDefault;
        let stringed = String(event.target.value)
        setStationId(stringed)
    }


    return (
        <div>
            <p>Arrival Times</p>
                <form onSubmit={handleSubmit}>
                <label htmlFor="stationId">StationId:</label>
                <input name="stationId" onChange={handleChange} value={stationId} />
                <button type="input">Submit</button>
                </form>
                {stationName && <Text>{stationName}</Text>}
                {trains && (
                    <div>
                        <Text>{stationName}</Text>
                        {trains.map((train, index)=> (
                            <div key = {index}>
                               <button>{train}</button>
                            </div>
                        ))}
                    </div>
                )}

        </div>
    )
}


export default ArrivalTimes;