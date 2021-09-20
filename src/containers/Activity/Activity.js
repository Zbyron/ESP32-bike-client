import React from "react";
import { Link } from "react-router-dom";
 
function Activity() {
    return (
        <div>
            <h1>ESP32 Bike</h1>
            <h2>ESP32 Activity started</h2>
            <Link to="/Results">Quit</Link>
        </div>
    );
  }
  
  export default Activity;