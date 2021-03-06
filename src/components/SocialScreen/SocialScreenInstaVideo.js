import React, { PureComponent } from 'react'
import { SocialScreenInstaInfo } from './SocialScreenInstaInfo'

export default class SocialScreenInstaVideo extends PureComponent {

  render() {
    return(
      <div className="slide_container">
        <div className="slide_left">
          <video className="slide_image" autoPlay loop muted poster={ this.props.data.display_url }>
            <source src={ this.props.data.video_url } type="video/mp4" ></source>
          </video>
        </div>
        <div className="slide_right">
        <SocialScreenInstaInfo data={ this.props.data } location={ this.props.location } />
        </div>
      </div>
    )
  }
}