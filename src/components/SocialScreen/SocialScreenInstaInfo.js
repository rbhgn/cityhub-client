import React, { PureComponent } from 'react'
import logo from '../../img/cityhub-logo-black.svg'
import instagramLogo from '../../img/instagramLogo.png'

export class SocialScreenInstaInfo extends PureComponent {

  render() {
    return(
        <div>
          <div className="slide_logo">
            <img src={ logo } className='logoStyle' alt="cityhub_logo" />
          </div>
          <div className="slide_header">
            <div className="slide_header_left">
              <img src={ this.props.data.profile_pic_url } alt="profile_pic" height="75px" className="slide_header_profile_pic"/>
            </div>
            <div className="slide_header_right">
              <div className="slide_header_full_name" >{ this.props.data.full_name }</div>
              <div className="slide_header_user_name">@{ this.props.data.user_name }</div>
            </div>
          </div>
          <div className="slide_body">
            { this.props.data.text }
          </div>
          <div className="slide_footer">
          <img src={instagramLogo} height="64px" alt={ this.props.data.user_name }/>
            #cityhub{ this.props.location }
          </div>   
        </div>
    )
  }
}