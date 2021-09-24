import React, { useState, useEffect, useCallback } from "react";
import "bulma/css/bulma.css";
import { useSelector, useDispatch } from 'react-redux'
import './Header.css'

function Header() {
    const [location, setLocation] = useState('')


    const storeLocation = useSelector((state) => state.currentScreen.appData.currentScreen )

    // useEffect(() =>{

    // }, [])

    return (
        <div className="section headBG">
            <div className="level">
                <h1 className="title">ESP32 Bike</h1>
                <h3 className="subtitle">{location || storeLocation}</h3>
            </div>
        </div>
    );
  }
  
  export default Header;