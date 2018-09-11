import React, { PureComponent } from 'react'

export default class MessagesRender extends PureComponent {
  
  handleClick = (e) => {
    if (window.confirm("Are you sure you want to remove this message?")) {
      this.props.handleDeleteMessage(e.currentTarget.id)
    }
  }

  render() {
    return(
      this.props.messages.sort((a, b) => b.id - a.id ).map((m, i) => {
        return (
          <div key={ i } className="message_item_container">
            <p>{m.message}</p>
            <button onClick={ this.handleClick } id={ m.id } className="message_delete_button">Delete Message</button>
           </div>
        )
      })
    )
  }
}