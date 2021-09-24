import React, { useState, useEffect, useCallback } from "react";
import "bulma/css/bulma.css";
import './ActivityItem.css'
import "bulma-helpers/css/bulma-helpers.min.css";
import { calculateDuration, formatTime, calculateFinalScore, getMeters } from '../../utils/utils'

function ActivityItem({activity}) {
 
    return (

        <div className="card">
            <div className="card-content">
                <div className="content">
                    Date: {activity["START_DATE"]} <br/>
                    score: {activity["SCORE"]} |
                    Distance: {activity["METERS"] } M |
                    Duration: {formatTime(calculateDuration(activity["START_DATE"], activity["END_DATE"])) } 
                </div>
            </div>
        </div> 
    );
  }
  
  export default ActivityItem;