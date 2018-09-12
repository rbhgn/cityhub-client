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
      <div className="settings_container">
      
      <form onSubmit={ this.handleSubmit}>
      <p><i>It might take some time for the changes to be vissible on the Social Screen, depending on the "Refresh Data Time"</i></p>
      <div className="settings_grid">
      <p>Refresh data for Social Screen</p>
      <input type="range" min="2" max="30" value={ this.state.refreshData || this.props.data.refreshData }  name="refreshData" onChange={ this.handleOnChange } />
      <p>{ this.state.refreshData || this.props.data.refreshData } Minutes</p>
      
      
      <p>Refresh item on Social Screen</p>
      <input type="range" min="2" max="60" value={ this.state.refreshItem || this.props.data.refreshItem }  name="refreshItem" onChange={ this.handleOnChange } />
      <p>{ this.state.refreshItem || this.props.data.refreshItem } Seconds</p>

      <p>Refresh message on Social Screen</p>
      <input type="range" min="2" max="60" value={ this.state.messageBarInterval || this.props.data.messageBarInterval }  name="messageBarInterval" onChange={ this.handleOnChange } />
      <p>{ this.state.messageBarInterval || this.props.data.messageBarInterval } Seconds</p>
  
      <p>Event-item Interval</p>
      <input type="range" min="2" max="60" value={ this.state.eventInterval || this.props.data.eventInterval }  name="eventInterval" onChange={ this.handleOnChange } />
      <p>{ this.state.eventInterval || this.props.data.eventInterval } Slides</p>
  
      
      </div>
      <input type="submit" className="settings_add_button" value="Save Settings"/>
    </form>
      
    </div>
    )
  }
}