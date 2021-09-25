import React from "react";
import "bulma/css/bulma.css";
import './ActivityItem.css'
import "bulma-helpers/css/bulma-helpers.min.css";
import { calculateDuration, formatTime, formatDisplayDate, getKM } from '../../utils/utils'
import PropTypes from 'prop-types';

function ActivityItem({ activity, bgInvert}) {
    const whiteStyle = ' has-background-white '
    const lightStyle = ' has-background-light '
    return (
        <div className={"card "}>
            <div className={`card-content ${bgInvert ? lightStyle : whiteStyle} `}>
                <div className='content'>
                    <b>Date:</b> {formatDisplayDate(activity["START_DATE"])} 
                    <div className="level">
                        <div className="level-left">
                            <b  className="level-item">Distance:</b> {getKM(activity["METERS"])} KM 
                        </div>
                        <div className="level-right">
                            <b  className="level-right">Duration:</b> {formatTime(calculateDuration(activity["START_DATE"], activity["END_DATE"])) }
                        </div>      
                    </div>
                    <div className='card-footer'>
                        <b>[Score]</b> {activity["SCORE"]}
                    </div>
                </div>
            </div>
        </div> 
    );
  }
  
  ActivityItem.propTypes = {
    key: PropTypes.number,
    activity: PropTypes.object,
    bgInvert: PropTypes.bool
  };

  export default ActivityItem;