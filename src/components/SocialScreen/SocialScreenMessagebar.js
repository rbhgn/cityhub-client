import React, { PureComponent } from 'react'

export default class SocialScreenMessagebar extends PureComponent {

  render() {
    return(
      <div className="message_bar">
          {this.props.message && <div className="message_item" style={{margin:"10px 0px 0px 20px"}}><div> <img src={ this.props.host.Picture } alt="profile_pic" height="60px" className="slide_header_profile_pic"/></div><div style={{margin:"0px 0px 0px 20px",whiteSpace: "nowrap"}}>{ `${this.props.message}` }</div></div>}
      </div>
    )
  }
}