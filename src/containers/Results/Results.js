import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

function Results() {
    const session = useSelector((state) => state.session.session)

    return (
        <div>
            <h1>ESP32 Bike</h1>
            <h2>Results</h2>
            <h4> Session Demo { JSON.stringify(session) }</h4>

            <Link to="/Intro">start</Link>
        </div>
    );
  }
  
  export default Results;