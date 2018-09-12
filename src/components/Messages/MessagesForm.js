import React, { PureComponent } from 'react'

export default class MessagesForm extends PureComponent {
  state = {message: ''}
  
  handleOnChange = (e) => {
    this.setState(
      {[e.target.name]: e.target.value}

    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleAddMessage(this.state)
    this.setState({message: ''})
  }
  
  render() {
    return(
      <form onSubmit={ this.handleSubmit}>
        <input type="text" name="message" onChange={ this.handleOnChange } value={ this.state.message } placeholder="New message" className="message_input" required maxLength="70"/>
        <input type="submit" className="message_add_button" />
      </form>
    )
  }
}