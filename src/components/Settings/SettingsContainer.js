import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router-dom/Redirect';
import { getSettings, updateSettings } from '../../actions/settings'
import MenuContainer from '../Menu/MenuContainer';

import './Settings.css'
import SettingsForm from './SettingsForm'


class SettingsContainer extends PureComponent {

  handleUpdateSettings = (id, data) => {
    this.props.updateSettings(id, data)
  }

  componentDidMount() {
    this.props.getSettings(this.props.location)
  }

  render() {
    return(
      <div>
        <MenuContainer />
        { this.props.settings.location && <SettingsForm data={ this.props.settings } handleUpdateSettings={ this.handleUpdateSettings }/> }
        { this.props.settings.updated && <Redirect to='/instagram'>Instagram</Redirect> }
   </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    location: state.currentUser ? state.currentUser.location : false,
    settings: state.settings
  }
}

export default connect(mapStateToProps, {  getSettings, updateSettings })(SettingsContainer)