import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { channels } from '../../constants/storeChannels'

function Records() {
    const [dbSession, setDbSession] = useState({})

    useEffect(() => {
        window.api.send(channels.SESSIONS,{})
        const removeEventListener = window.api.receive(channels.SESSIONS,(result) => {
           setDbSession(result)
        })

        return () => {
            removeEventListener();
        };
   },[])

    return (
        <div>
            <h1>ESP32 Bike</h1>
            <h2>records</h2>
            <h4> DB Demo { JSON.stringify(dbSession) }</h4>
            <Link to="/Intro">back</Link>
        </div>
    );
  }
  
  export default Records;