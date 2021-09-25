import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { latest } from '../../features/session/sessionSlice'
import useInterval from '../../hooks/useInterval'
import { channels } from '../../constants/storeChannels'
import { currentScreen } from '../../features/appData/appDataSlice'
import { calculateDuration, calculateScore, calculateFinalScore, getMeters, formatTime, getKM } from '../../utils/utils'
import  { version, pedMeters } from '../../constants/constants'
import "bulma/css/bulma.css";
import "bulma-helpers/css/bulma-helpers.min.css";

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
        const avgSpeed =  +parseFloat(((getMeters(peds)) / duration) ).toFixed(2)
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
        <div className="">
            <div className="tile is-ancestor">
                <div className="tile is-4 is-vertical is-parent">
                    <div className="tile is-child box">
                        <p className="title">Time</p>
                        <p className="is-size-5" > {formatTime(duration)} </p>
                        <hr />
                        <p className="title">Score</p>
                        <p  className="is-size-5">{score}</p>
                        <hr />
                        <button className="button is-rounded is-medium is-danger" onClick={endSession}>End Session</button>
                    </div>
                </div>
                <div className="tile is-parent">
                    <div className="tile is-child box">
                        <p className="title">Stats</p>
                        <div className="level">
                            <p className="is-size-4"> KM:</p>
                            <p className="is-size-2	"> {getKM(peds)}</p>
                        </div>
                        <hr />
                        <div className="level">
                            <p className="is-size-3"> Speed:</p>
                            <p className="is-size-3	"> {KMPH}</p>
                        </div>
                        <hr />
                        <div className="level">
                            <p className="is-size-4"> Top Speed:</p>
                            <p className="is-size-3	"> {maxKMPH}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Activity