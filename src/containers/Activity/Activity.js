import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import io from 'socket.io-client';
import { latest } from '../../features/session/sessionSlice'
import useInterval from '../../hooks/useInterval'
import { channels } from '../../constants/storeChannels'

const pedMeters = 5.3

function calculateDuration(startDate) {
    const startDateObj = new Date(startDate)
    const currentTime = new Date()

    return Math.round((currentTime - startDateObj) /1000)
}

function calculateScore(meters,duration, maxKMPH){
    let score = 0
    const meterPoints = meters * 25.5
    const durationPoints = duration * 10
    const maxKMPHPoints = maxKMPH * 200

    score = Math.round(meterPoints + durationPoints + maxKMPHPoints)
    
    return score
}

function calculateFinalScore(score, avgSpeed){
    const avgSpeeedPoints = avgSpeed * 100
    return Math.round(score + avgSpeeedPoints)

}
function getMeters(peds) {
    return peds * pedMeters
}

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

    const version = 0

    const updateBikeData = useCallback( () => {
        setPeds(peds + 1)
        setPedInterval(pedInverval + 1)
      })
    
    const endSession = useCallback(() => {
        const avgSpeed = ((getMeters(peds) /1000) / duration) 
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
        setScore(calculateScore(peds,duration, maxKMPH))

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
            <h3> Score {score}</h3>
            <h3> Duration {duration}</h3>

            <button onClick={endSession}>End Session</button>
        </div>
    );
  }
  
  export default Activity