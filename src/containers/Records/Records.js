import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { channels } from '../../constants/storeChannels'
import { currentScreen } from '../../features/appData/appDataSlice'
import { useDispatch } from 'react-redux'
import ActivityList from '../ActivityList/ActivityList'
import "bulma/css/bulma.css";
import "bulma-helpers/css/bulma-helpers.min.css";

function Records() {
    const dispatch = useDispatch()

    const [dbSession, setDbSession] = useState([])

    useEffect(() => {
        dispatch(currentScreen('Records'))

        window.api.send(channels.SESSIONS, 50)
        const removeEventListener = window.api.receive(channels.SESSIONS,(result) => {
           setDbSession(result)
        })

        return () => {
            removeEventListener();
        };
   },[])

    return (
        <div className="section">
            <div className="container ">
                <h2 className="subtitle "> Last 50 Sessions </h2>
                <ActivityList  activities={ dbSession }/>
                <div className="has-padding-top-20 "> 
                    <Link  className="button is-info is-small" to="/Intro">Home</Link>
                </div>
            </div>
        </div>
    );
  }
  
  export default Records;