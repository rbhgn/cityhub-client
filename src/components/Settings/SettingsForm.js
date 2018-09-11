import React, { PureComponent } from 'react'

export default class SettingsForm extends PureComponent {
  
state={}
  // state = {
  //   refreshData: this.props.data.refreshData,
  //   refreshItem: this.props.data.refreshItem,
  //   eventInterval: 0,
  //   messageBarSpeed: 0,
  //   location: 0
  // }
  handleOnChange = (e) => {
    this.setState(
      {[e.target.name]: e.target.value}

    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleUpdateSettings(this.props.data.id, this.state)
  }
  
// componentDidMount() {
//   this.setState({
//     refreshItem: this.props.data.refreshItem,
//     eventInterval: this.props.data.eventInterval,
//     messageBarSpeed: this.props.data.messageBarSpeed,
//     location: this.props.data.location
//   })
// }

  render() {
    return(
      <form onSubmit={ this.handleSubmit}>
      <p>Refresh data on Social Screen</p>
      <input type="range" min="2" max="30" value={ this.state.refreshData || this.props.data.refreshData } defaultValue = { this.state.refreshData || this.props.data.refreshData } name="refreshData" onChange={ this.handleOnChange } />
      <p>{ this.state.refreshData || this.props.data.refreshData } Minutes</p>
  
      <p>Refresh item on Social Screen</p>
      <input type="range" min="2" max="60" value={ this.state.refreshItem || this.props.data.refreshItem } defaultValue = { this.state.refreshItem || this.props.data.refreshItem } name="refreshItem" onChange={ this.handleOnChange } />
      <p>{ this.state.refreshItem || this.props.data.refreshItem } Seconds</p>
  
      <p>Eventslide Interval</p>
      <input type="range" min="2" max="60" value={ this.state.eventInterval || this.props.data.eventInterval } defaultValue = { this.state.eventInterval || this.props.data.eventInterval } name="eventInterval" onChange={ this.handleOnChange } />
      <p>{ this.state.eventInterval || this.props.data.eventInterval } Slides</p>
  
      <p>Messagebar Speed</p>
      <input type="range" min="1" max="5" value={ this.state.messageBarSpeed || this.props.data.messageBarSpeed } defaultValue = { this.state.messageBarSpeed || this.props.data.messageBarSpeed  } name="messageBarSpeed" onChange={ this.handleOnChange } />
      <p>{ this.state.messageBarSpeed * 5 || this.props.data.messageBarSpeed  * 5 } Milliseconds</p>
  
      <input type="submit" className="message_add_button" value="Save Settings"/>
    </form>
    )
  }
}