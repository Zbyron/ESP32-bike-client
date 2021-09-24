import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import { useSelector, useDispatch } from 'react-redux'
import { currentScreen } from '../../features/appData/appDataSlice'
import ActivityList from '../ActivityList/ActivityList'
import { channels } from '../../constants/storeChannels'
import './Intro.css'
function Intro() {
    const dispatch = useDispatch()
    const [activitiesList, setActivitiesList] = useState([])

    useEffect(() => {
        dispatch(currentScreen('Home'))

        window.api.send(channels.SESSIONS, 5)
        const removeEventListener = window.api.receive(channels.SESSIONS,(result) => {
            setActivitiesList(result)
        })

        return () => {
            removeEventListener();
        };
   },[])

    return (
        <div className="section">
            <div className="level">
            <div className="container  right-container">
                <h2 className="subtitle"> Recent Activity </h2>
                <ActivityList  activities={ activitiesList }/>
                <div className="has-padding-top-50 "> 
                <Link  className="button " to="/Records">Records</Link>
                </div>
            </div>
            <div className="container ">
                <Link className="button" to="/Activity">start</Link>
            </div>
        </div>
            
        </div>
    );
  }
  
  export default Intro;