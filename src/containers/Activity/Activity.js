import React,  { useState, useEffect, useCallback, useRef  } from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import { Redirect  } from 'react-router-dom'
import useInterval from '../../hooks/useInterval'

function Activity () {
    const [date, setDate] = useState(new Date());
    const [meters, setMeters] = useState(0);
    const [peds, setPeds] = useState(0);
    const [intervalCount, seIntervalCount] = useState(0);
    const [pedInverval, setPedInterval] = useState(0);
    const [KMPH, setKMPH] = useState(0);

    const updateBikeData = useCallback( () => {
        // window.api.send('results', JSON.stringify(this.state))
        setPeds(peds +1)
        setPedInterval(pedInverval +1)
      })
    
    const endSession = useCallback(() => {
        return <Redirect  to='/Results'/>
    
    })

    useInterval(() => {
        // Your custom logic here
        let kmph = (((pedInverval * 5.3)  /1000) * 20) * 60
        if (kmph < 0) kmph = 0
        seIntervalCount(intervalCount + 1)
        setPedInterval(0)
        setKMPH(kmph)
    }, 3000);
    

    useEffect(() => {
        let socket = io('http://localhost:8888');
        socket.on('serialdata', (data) => {
            console.log('data', data)
            updateBikeData()
        });

        return function cleanup() {
            // clearInterval(interval);
            socket.close();          };

      });
  
        return (
            <div>
                <h1>ESP32 Bike</h1>
                <h2>ESP32 Activity started</h2>
                <h3> Peds {peds}</h3>
                <h3> Interval {intervalCount}</h3>
                <h3> KMPH {KMPH}</h3>

                {/* <Link to="/Results">Quit</Link> */}
                <button onClick={endSession}>End Session</button>
            </div>
        );
  }
  
  export default Activity