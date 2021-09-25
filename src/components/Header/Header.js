import React, { useState } from "react";
import "bulma/css/bulma.css";
import { useSelector } from 'react-redux'
import './Header.css'

function Header() {
    const [location] = useState('')
    const storeLocation = useSelector((state) => state.currentScreen.appData.currentScreen )

    return (
        <div className="section headBG">
            <div className="level">
                <h1 className="title">ESP32 Bike</h1>
                <h3 className="subtitle is-1">{location || storeLocation}</h3>
            </div>
        </div>
    );
  }
  
  export default Header;