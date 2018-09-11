import React, { PureComponent } from 'react'
import { SocialScreenInstaInfo } from './SocialScreenInstaInfo'

export default class SocialScreenInstaImage extends PureComponent {

  render() {
    return(
      <div className="slide_container">
        <div className="slide_left">
          <img src={ this.props.data.display_url } className="slide_image" alt={ this.props.data.user_name}/>
        </div>
        <div className="slide_right">
          <SocialScreenInstaInfo data={ this.props.data } location={ this.props.location }/>
        </div>
      </div>
    )
  }
}