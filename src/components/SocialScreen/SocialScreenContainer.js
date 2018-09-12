import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { getInstagramScreen } from '../../actions/instagram'
import { getEventsScreen } from '../../actions/events'
import { getMessagesScreen } from '../../actions/messages'
import { getHostData } from '../../actions/host'
import { getSettingsScreen } from '../../actions/settings'

import SocialScreenInstaImage from './SocialScreenInstaImage'
import SocialScreenInstaVideo from './SocialScreenInstaVideo'
import SocialScreenEvent from './SocialScreenEvent'
import SocialScreenMessagebar from './SocialScreenMessagebar'

import './SocialScreen.css'

const refreshData = 1
const refreshItem = 15
const eventInterval = 10
const refreshMessage = 8
class SocialScreenContainer extends PureComponent {
  state = {location : this.props.match.params.location, counter: 0, messagesIndex: 0, currentMessage: ''}
  
  getNewData = () => {
    this.props.getInstagramScreen(this.state.location)
    this.props.getEventsScreen(this.state.location)
    this.props.getMessagesScreen(this.state.location)
    this.props.getHostData(this.state.location)

  }

  getCurrentItem = (type) => {
    if (type === 'event' && this.props.events.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.props.events.length)
      this.setState({currentItem: this.props.events[randomIndex]})
    } else if (type === 'instagram' && this.props.instagram.length > 0){
      const randomIndex = Math.floor(Math.random() * this.props.instagram.length)
      this.setState({currentItem: this.props.instagram[randomIndex]})
    }

  }
  setCurrentItem = () => {
    this.state.counter === 0 && this.props.events.length > 0 ? this.getCurrentItem('event') : this.getCurrentItem('instagram')
    this.state.counter >= eventInterval ? this.setState({counter: 0}) : this.setState((prevState) => ({counter: prevState.counter + 1}))
  } 

  setCurrentMessage = () => {
    !this.props.messages.length ? this.setState({currentMessage: ''}) : this.setState({currentMessage: this.props.messages[this.state.messagesIndex].message})
    this.state.messagesIndex >= this.props.messages.length - 1 ? this.setState({messagesIndex: 0}) : this.setState((prevState) => ({messagesIndex: prevState.messagesIndex + 1}))
  }
  componentDidMount() {
    this.getNewData()
    setInterval(() => this.getNewData(), refreshData * 60 * 1000)
    setInterval(() => this.setCurrentItem(), refreshItem * 1000)
    setInterval(() => this.setCurrentMessage(), refreshMessage * 1000)
  }

  render() {
    return(
    <div>
      { this.props.messages && <SocialScreenMessagebar message={ this.state.currentMessage } host={ this.props.host } /> }
      { this.state.currentItem && this.state.currentItem.media === 'instagramVideo' && <SocialScreenInstaVideo data={ this.state.currentItem }location={ this.state.location }/> }
      { this.state.currentItem && this.state.currentItem.media === 'instagramImage' && <SocialScreenInstaImage data={ this.state.currentItem }location={ this.state.location } /> }
      { this.state.currentItem && this.state.currentItem.media === 'event' && <SocialScreenEvent data={ this.state.currentItem } host={ this.props.host } location={ this.state.location }/> }
    </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    instagram: state.instagram,
    events: state.events,
    messages: state.messages,
    host: state.host,
    settings: state.settings
  }
}

export default connect(mapStateToProps, { getInstagramScreen, getEventsScreen, getMessagesScreen, getHostData, getSettingsScreen })(SocialScreenContainer)