import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { channels } from '../../constants/storeChannels'
import { useState, useEffect } from "react";
import { currentScreen } from '../../features/appData/appDataSlice'

function Results() {
    const dispatch = useDispatch()

    const session = useSelector((state) => state.session.session)
    const [stateSession, setStateSession] = useState()

    useEffect(() => {
        dispatch(currentScreen('Results'))

        window.api.send(channels.LAST_SESSION,{})

        const removeEventListener = window.api.receive(channels.LAST_SESSION,(stateSession) => {
            setStateSession(stateSession)
        })

        return () => {
            removeEventListener();
        };
   },[])

    return (
        <div>
            <h2>Results</h2>
            <h4> Session Demo { JSON.stringify(stateSession) || JSON.stringify(session) }</h4>
            <Link to="/Intro">start</Link>
            <Link to="/Records">Records</Link>
        </div>
    );
  }
  
  export default Results;