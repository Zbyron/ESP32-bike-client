import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import io from 'socket.io-client';
import { latest } from '../../features/session/sessionSlice'
import useInterval from '../../hooks/useInterval'
import { channels } from '../../constants/storeChannels'
function Activity () {
    const history = useHistory()
    const dispatch = useDispatch()
    const pedMeters = 5.3
    const [startDate, setStartDate] = useState(new Date().toJSON())
    const [peds, setPeds] = useState(0)
    const [intervalCount, seIntervalCount] = useState(0)
    const [pedInverval, setPedInterval] = useState(0)
    const [KMPH, setKMPH] = useState(0)
    const version = 0
    const updateBikeData = useCallback( () => {
        setPeds(peds +1)
        setPedInterval(pedInverval +1)
      })
    
    const endSession = useCallback(() => {
        const avgSpeed = 0 //calculate this
        const score = 0
        // // save to db
        // const sql = 'SELECT * FROM SESSION'
        // window.api.send(channels.LAST_RESULT,sql)
        const sessionData = {
            startDate: startDate,
            peds,
            meters: peds * pedMeters,
            endDate: new Date().toJSON(),
            score: score
        }
        
        dispatch(latest(sessionData))

        const sql = `INSERT INTO SESSION (START_DATE, END_DATE, PEDS, METERS, SCORE, VERSION) VALUES( "${startDate}" ,"${sessionData.endDate}", ${peds}, ${sessionData.meters}, ${score}, ${version});`
        window.api.send(channels.ADD_SESSION,sql)
        history.push("/Results");
    
    })

    useInterval(() => {
        let kmph = (((pedInverval * pedMeters)  /1000) * 20) * 60
        if (kmph < 0) kmph = 0
        seIntervalCount(intervalCount + 1)
        setPedInterval(0)
        setKMPH(kmph)
    }, 3000);
    

    useEffect(() => {
        let socket = io('http://localhost:8888');
        socket.on('serialdata', (data) => {
            console.log('bike data', data)
            updateBikeData()
        });

        return function cleanup() {
            socket.close();
        };
      });
  
    return (
        <div>
            <h1>ESP32 Bike</h1>
            <h2>ESP32 Activity started</h2>
            <h3> Peds {peds}</h3>
            <h3> Interval {intervalCount}</h3>
            <h3> KMPH {KMPH}</h3>
            <button onClick={endSession}>End Session</button>
        </div>
    );
  }
  
  export default Activity