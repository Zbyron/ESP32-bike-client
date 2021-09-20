import React from "react";
import { Link } from "react-router-dom";
 
function Records() {
    return (
        <div>
            <h1>ESP32 Bike</h1>
            <h2>records</h2>

            <Link to="/Intro">back</Link>
        </div>
    );
  }
  
  export default Records;