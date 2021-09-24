import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Activity from './containers/Activity/Activity'
import Results from './containers/Results/Results'
import Intro from './containers/Intro/Intro'
import Records from './containers/Records/Records'
import Header from './components/Header/Header'
import store from './app/store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import { HashRouter, Route } from "react-router-dom"
import Footer from './containers/Footer/Footer'
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
          <div className="App " id="wrapper">
            <Header />
            <Route path="/" exact component={Intro} />
            <Route path="/Intro" exact component={Intro} />
            <Route path="/Activity" exact component={Activity} />
            <Route path="/Results" exact component={Results} />
            <Route path="/Records" exact component={Records} />
            {/* <Footer /> */}

          </div>
        </HashRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
