import React, { PureComponent } from 'react'

const initialState = {
  title: '', 
  imgUrl:'',
  address:'',
  startDate:'',
  endDate:'',
  description:''
}

export default class EventsForm extends PureComponent {
  state = initialState
  
  handleOnChange = (e) => {
    this.setState(
      {[e.target.name]: e.target.value}
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleAddEvent(this.state)
    this.setState(initialState)
  }
  
  render() {
    return(
      <div className="event_form_container">
      <form onSubmit={ this.handleSubmit} className="event_form">
        <div>
          <input type="text" name="title" onChange={ this.handleOnChange } value={ this.state.title } className="event_input" placeholder="Title*" required/>
        </div>
        <div>
          <input type="text" name="imgUrl" onChange={ this.handleOnChange } value={ this.state.imgUrl } className="event_input" placeholder="Image Url"/>
        </div>
        <div>
          <input type="text" name="address" onChange={ this.handleOnChange } value={ this.state.address } className="event_input"
        placeholder="Address"/>
        </div>
        <div>
        <label>Start Date</label>
        <input type="date" name="startDate" onChange={ this.handleOnChange } value={ this.state.startDate } className="event_date"/>
        </div>
        <div>
        <label>End Date</label>
        <input type="date" name="endDate" onChange={ this.handleOnChange } value={ this.state.endDate } className="event_date"/>
        </div>
        <div>
          <textarea placeholder="Description*" name="description" onChange={ this.handleOnChange } value={ this.state.description } rows="5"  required></textarea>
        </div>
        <div>
        <input type="submit" className="event_submit_button"/>
        </div>
        
      </form>
      </div>
    )
  }
}