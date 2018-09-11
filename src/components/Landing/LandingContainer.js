import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

class LandingContainer extends PureComponent {

  render() {
    return (
      !this.props.currentUser ? <Redirect to="/login" /> : <Redirect to="/instagram" />
    )
  }
}

export default connect(null)(LandingContainer)