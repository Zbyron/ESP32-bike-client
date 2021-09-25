import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { channels } from '../../constants/storeChannels'
import { useState, useEffect } from "react";
import { currentScreen } from '../../features/appData/appDataSlice'
import "bulma/css/bulma.css";
import "bulma-helpers/css/bulma-helpers.min.css";
import { calculateDuration, formatTime, getKM } from '../../utils/utils'

function Results() {
    const dispatch = useDispatch()
    const [stateSession, setStateSession] = useState()
    const [duration, setDuration] = useState('')
    const [score, setScore] = useState(0)
    const [distance, setDistance] = useState(0)
    
    useEffect(() => {
        dispatch(currentScreen('Results'))
        window.api.send(channels.LAST_SESSION,{})

        const removeEventListener = window.api.receive(channels.LAST_SESSION,(stateSession) => {
            setStateSession(stateSession)
            setDuration(formatTime(calculateDuration(stateSession["startDate"], stateSession["endDate"])))
            setScore(stateSession["score"])
            setDistance(getKM(stateSession["peds"]))
        })

        if (stateSession) 


        return () => {
            removeEventListener();
        };
   },[])

    return (
        <div className="has-padding-left-10 has-padding-top-5 ">
            <div className="level">
                <p className="title">Time</p>
                <p className="is-size-4 has-padding-right-10" > {duration} </p>
            </div>
            <hr />

            <div className="level">
                <p className="title"> Distance (KM):</p>
                <p className="is-size-4	has-padding-right-10"> {distance}</p>
            </div>
            <hr />
            <div className="level">
                <p className="title has-text-danger	">Total Score</p>
                <p  className="is-size-2 has-padding-right-10">{score}</p>
            </div>
            <hr />
            <div className="buttons has-padding-left-10 ">
                <Link className="button is-small is-info" to="/Intro">Home</Link>
                <Link className="button is-small is-dark" to="/Records">Records</Link>
            </div>
        </div>
    );
  }
  
  export default Results;