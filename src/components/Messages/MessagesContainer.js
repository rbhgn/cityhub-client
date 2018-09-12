import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { postMessage, getMessages, deleteMessage} from '../../actions/messages'
import MessagesForm from './MessagesForm'
import MessagesRender from './MessagesRender'
import MenuContainer from '../Menu/MenuContainer';
import './Message.css'

class MessagesContainer extends PureComponent {

  handleAddMessage = (data) => {
    console.log(data)
    this.props.postMessage(data)
  }

  handleDeleteMessage = (index) => {
    this.props.deleteMessage(index)
    console.log(index)
  }

  componentDidMount() {
    this.props.getMessages()
  }

  render() {
    return(
      <div>
        <MenuContainer />
        <div className="message_container">
        <MessagesForm  handleAddMessage={ this.handleAddMessage }/>
        { this.props.messages && <MessagesRender messages={ this.props.messages } handleDeleteMessage={ this.handleDeleteMessage }/> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    location: state.currentUser ? state.currentUser.location : false,
    messages: state.messages
  }
}

export default connect(mapStateToProps, { postMessage, getMessages, deleteMessage })(MessagesContainer)