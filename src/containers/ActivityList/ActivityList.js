import React, { useState, useEffect, useCallback } from "react";
import "bulma/css/bulma.css";
import './ActivityList.css'
import "bulma-helpers/css/bulma-helpers.min.css";
import ActivityItem from "../../components/ActivityItem/ActivityItem";

function ActivityList({activities}) {
    const listItems = activities.map((activity) =>
    <li><ActivityItem  activity={ activity }/></li>
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