import React from "react";
import { Link } from "react-router-dom";
 
function Intro() {
    return (
        <div>
            <h1>ESP32 Bike</h1>
            <Link to="/Activity">start</Link>
        </div>
    );
  }
  
  export default Intro;