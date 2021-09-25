import React from "react";
import "bulma/css/bulma.css";
import './ActivityList.css'
import "bulma-helpers/css/bulma-helpers.min.css";
import ActivityItem from "../../components/ActivityItem/ActivityItem";
import PropTypes from 'prop-types';

function ActivityList({activities}) {
    let invert = true
    const listItems = activities.map((activity, index) => {
        invert = !invert
        return <li  key={ index } ><ActivityItem activity={ activity } bgInvert ={invert}/></li>
        }
    );

    return (
        <div className=" parent">
            <article className="columns child">
                <section className="column ">
                    <ul>{listItems}</ul>
                </section>
            </article>
        </div>   
    );
  }
  
  ActivityList.propTypes = {
    activities: PropTypes.array,
  };
  export default ActivityList;