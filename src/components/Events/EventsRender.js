import React, { PureComponent } from 'react'
import noImage from '../../img/no_image.jpg'

import { GetFormattedDate } from '../../functions'

export default class EventsRender extends PureComponent {
  
  handleClick = (e) => {
    if (window.confirm("Are you sure you want to remove this event?")) {
      this.props.handleDeleteEvent(e.currentTarget.id)
    }
  }

  render() {
    return(
      <div className="event_items">
{      this.props.events.sort((a, b) => b.id - a.id ).map((m, i) => {
        return (
          <div key={ i } className="event_item">
            <p className="event_items_title">{m.title}</p>
            <div className='event_item_image_container'>
            <img src={ m.img_url ? m.img_url : noImage } className='event_item_image'  alt={ m.id }/>
            </div>
            <p className="event_items_text event_items_description">{m.description}</p>
            <p className="event_items_text">{m.address ? m.address : 'No Address'}</p>
            <p className="event_items_text"> { m.start_date ? <span>{ GetFormattedDate(m.start_date)  }</span>  : 'No Date'}{ m.end_date && ` - ${GetFormattedDate(m.end_date)}` }</p>
            <button onClick={ this.handleClick } id={ m.id } className="event_delete_button">delete</button>
           </div>
        )
      })}
      </div>
    )
  }
}