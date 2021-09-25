import React from "react";
import "bulma/css/bulma.css";
import './ActivityList.css'
import "bulma-helpers/css/bulma-helpers.min.css";
import ActivityItem from "../../components/ActivityItem/ActivityItem";

function ActivityList({activities}) {
    let invert = true
    const listItems = activities.map((activity) => {
        invert = !invert
        return <li><ActivityItem  activity={ activity } bgInvert ={invert}/></li>
        }
    );

    return (
        <div className=" parent">
            <article className="columns  child">
                <section className="column ">
                    <ul>{listItems}</ul>
                </section>
            </article>
        </div>   
    );
  }
  
  export default ActivityList;