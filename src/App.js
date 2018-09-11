import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import SignupPage from './components/Signup/SignupPage';
import LoginPage from './components/Login/LoginPage';
import LogoutPage from './components/Logout/LogoutPage';
import InstagramContainer from './components/Instagram/InstagramContainer'
import MessagesContainer from './components/Messages/MessagesContainer'
import EventsContainer from './components/Events/EventsContainer'
import LandingContainer from './components/Landing/LandingContainer'
import SocialScreenContainer from './components/SocialScreen/SocialScreenContainer';
// import SettingsContainer from './components/Settings/SettingsContainer'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <main>
            <Route exact path="/signup" component={ SignupPage }/>
            <Route exact path="/login" component={ LoginPage }/>
            <Route exact path="/logout" component={ LogoutPage }/>

            <Route exact path="/instagram" component={ InstagramContainer }/>
            <Route exact path="/messages" component={ MessagesContainer }/>
            <Route exact path="/events" component={ EventsContainer }/>
            {/* <Route exact path="/settings" component={ SettingsContainer }/> */}
            <Route exact path="/" component={ LandingContainer }/>

            <Route exact path="/socialscreen/:location" component={ SocialScreenContainer }/>
            
          </main>
          
        </div>
      </Router>
    )
  }
}
export default App
