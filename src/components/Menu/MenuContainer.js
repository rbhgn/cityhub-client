import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import './Menu.css'
import { Link } from 'react-router-dom'
import { getHostData } from '../../actions/host'
import logo from '../../img/cityhub-logo-black.svg'
import Redirect from 'react-router-dom/Redirect';

class MenuContainer extends PureComponent {

  componentDidMount() {
    this.props.getHostData(this.props.location ? this.props.location : '')
  }

  render() {
    return(
      <div className="menu_container">
      {!this.props.currentUser.location && <Redirect to="/login" />}
        <div className="menu_logo">
          <img src={logo} className='logoStyle' alt=''/>
          <div className="title_container">
          <div className="title_top">SOCIALSCREEN</div> 
          <div className="title_bottom">{ this.props.currentUser.hotelCode }</div>
        </div>
        </div>

        <div className="menu_items">
          <div className="menu_item"><Link to='/instagram'>Instagram</Link></div>
          <div className="menu_item"><Link to='/events'>Events</Link></div>
          <div className="menu_item"><Link to='/messages'>Messages</Link></div>
          <div className="menu_item"><Link to='/settings'>Settings</Link></div>
          <div className="menu_item"><Link to={ `/socialscreen/${this.props.currentUser.location}` } target="_blank" >Preview</Link></div>
        </div>
        <div className="menu_host">
        <div>
          <p className="menu_host_name">Hello { this.props.host.FirstName }!</p>
          <div className="menu_host_log"><Link to='/logout'>Logout</Link></div>
        </div>
          <img src={ this.props.host.Picture } alt={ this.props.host.FirstName } className="menu_host_picture"/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    hotelCode: state.currentUser ? state.currentUser.hotelCode : false,
    host: state.host,
    currentUser: state.currentUser ? state.currentUser : false ,
    location: state.currentUser ? state.currentUser.location : false
  }
}

export default connect(mapStateToProps, {getHostData})(MenuContainer)