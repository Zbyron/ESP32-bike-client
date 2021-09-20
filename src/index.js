import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Activity from './containers/Activity/Activity'
import Results from './containers/Results/Results'
import Intro from './containers/Intro/Intro'
import Records from './containers/Records/Records'

import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Route } from "react-router-dom"
// import * as serviceWorker from './serviceWorker';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={Intro} />
          <Route path="/Intro" exact component={Intro} />
          <Route path="/Activity" exact component={Activity} />
          <Route path="/Results" exact component={Results} />
          <Route path="/Records" exact component={Records} />
        </div>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
