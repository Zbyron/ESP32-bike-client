import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { latest } from '../../features/session/sessionSlice'
import useInterval from '../../hooks/useInterval'
import { channels } from '../../constants/storeChannels'
import { currentScreen } from '../../features/appData/appDataSlice'
import { calculateDuration, calculateScore, calculateFinalScore, getMeters, formatTime } from '../../utils/utils'
import  { version, pedMeters } from '../../constants/constants'

function Activity () {
    const history = useHistory()
    const dispatch = useDispatch()
    const [startDate] = useState(new Date().toJSON())
    const [peds, setPeds] = useState(0)
    const [intervalCount, seIntervalCount] = useState(0)
    const [pedInverval, setPedInterval] = useState(0)
    const [KMPH, setKMPH] = useState(0)
    const [maxKMPH, setMaxKMPH] = useState(0)
    const [duration, setDuration] = useState(0)
    const [score, setScore] = useState(0)


    const updateBikeData = useCallback( () => {
        setPeds(peds + 1)
        setPedInterval(pedInverval + 1)
      })
    
    const endSession = useCallback(() => {
        const avgSpeed = ((getMeters(peds)) / duration) 
        const finalScore = (calculateFinalScore(score, avgSpeed))
        const sessionData = {
            startDate,
            peds,
            meters: getMeters(peds),
            endDate: new Date().toJSON(),
            score: finalScore ,
            avgSpeed,
            version
        }
        
        dispatch(latest(sessionData))
        window.api.send(channels.ADD_SESSION,sessionData)
        history.push("/Results");
    
    })

    useInterval(() => {
        let kmph = Math.round((((pedInverval * pedMeters)  /1000) * 20) * 60)
        if (kmph < 0) kmph = 0
        if(kmph > maxKMPH) setMaxKMPH(kmph)
        seIntervalCount(intervalCount + 1)
        setPedInterval(0)
        setKMPH(kmph)
    }, 3000);
    
    useInterval(() => {
        setDuration(calculateDuration(startDate))
    }, 1000);

    useEffect(() => {
        dispatch(currentScreen('Activity'))

        setScore(calculateScore(peds,duration, maxKMPH))
        const removeEventListener = window.api.receive(channels.COM_EVENT,(result) => {
            updateBikeData()
         })

         return () => {
            removeEventListener();
        };
      });
  
    return (
        <div>
            <h1>ESP32 Bike</h1>
            <h2>ESP32 Activity started</h2>
            <h3> Peds {peds}</h3>
            <h3> Interval {intervalCount}</h3>
            <h3> KMPH {KMPH}</h3>
            <h3> Score {score}</h3>
            <h3> Duration {formatTime(duration)}</h3>

            <button onClick={endSession}>End Session</button>
        </div>
    );
  }
  
  export default Activity