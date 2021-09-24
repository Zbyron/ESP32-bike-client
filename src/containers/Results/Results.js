import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { channels } from '../../constants/storeChannels'

function Results() {
    const session = useSelector((state) => state.session.session)
    const [dbSession, setDbSession] = useState({})
    useEffect(() => {
         // save to db
         const sql = 'SELECT * FROM SESSION ORDER BY ID DESC;'
         //             setDbSession(result)

         window.api.send(channels.RESULTS,sql)

         window.api.receive(channels.RESULTS,(result) => {
            setDbSession(result)
         })
        // window.api.receive
    },[])

    return (
        <div>
            <h1>ESP32 Bike</h1>
            <h2>Results</h2>
            <h4> Session Demo { JSON.stringify(session) }</h4>
            <h4> DB Demo { JSON.stringify(dbSession) }</h4>

            <Link to="/Intro">start</Link>
        </div>
    );
  }
  
  export default Results;