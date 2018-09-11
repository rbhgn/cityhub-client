import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { postEvent, getEvents, deleteEvent } from '../../actions/events'
import EventsForm from './EventsForm'
import EventsRender from './EventsRender'
import MenuContainer from '../Menu/MenuContainer';
import './Events.css'

class EventsContainer extends PureComponent {

  handleAddEvent = (data) => {
    this.props.postEvent(data)
  }

  handleDeleteEvent = (index) => {
    this.props.deleteEvent(index)
  }

  componentDidMount() {
    this.props.getEvents()
  }

  render() {
    return(
      <div>
        <MenuContainer />
        <EventsForm  handleAddEvent={ this.handleAddEvent }/>
        { this.props.events && <EventsRender events={ this.props.events } handleDeleteEvent={ this.handleDeleteEvent }/> }
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    location: state.currentUser.location,
    events: state.events
  }
}

export default connect(mapStateToProps, { postEvent, getEvents, deleteEvent })(EventsContainer)