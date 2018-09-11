import React, { PureComponent } from 'react'

import { GetFormattedDate, getRandomImage } from '../../functions'
import { defaultImages } from '../../constants'
import logo from '../../img/cityhub-logo-black.svg'
import instagramLogo from '../../img/instagramLogo.png'

export default class SocialScreenEvent extends PureComponent {

  render() {
    return(
      <div className="slide_container">
      <div className="slide_left">
   
        <img src={ this.props.data.img_url ? this.props.data.img_url : getRandomImage(defaultImages) } className="slide_image" alt={ this.props.data.title} />
        


      </div>
      <div className="slide_right">
      <div className="slide_logo">
            <img src={ logo } className='logoStyle' alt="cityhub_logo" />
          </div>
          <div className="slide_header">
            <div className="slide_header_left">
              <img src={ this.props.host.Picture } alt="profile_pic" height="75px" className="slide_header_profile_pic"/>
            </div>
            <div className="slide_header_right">
              <div className="slide_host_first_name" >{ this.props.host.FirstName }</div>
              {/* <div className="slide_header_user_name">@{ this.props.data.user_name }</div> */}
            </div>
          </div>
          <div className="slide_body">
            <h2>{ this.props.data.title }</h2>
            <p>{ this.props.data.description }</p>
            <hr />
            { this.props.data.address && <p><span className="greenText">Location: </span>{ this.props.data.address } </p>}
            <p> { this.props.data.start_date && <span><span className="greenText">Date: </span> { GetFormattedDate(this.props.data.start_date)  }</span> }{ this.props.data.end_date && ` - ${GetFormattedDate(this.props.data.end_date)}` }</p>
          </div>
          <div className="slide_footer">
          <img src={instagramLogo} height="64px" alt="instagram" />
            #cityhub<span className="greenText">{ this.props.location }</span>
          </div>   
      </div>
    </div>
    )
  }
}