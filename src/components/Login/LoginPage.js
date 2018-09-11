import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { login}  from '../../actions/users'
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm';
import './Login.css'
import logo from '../../img/cityhub-logo-black.svg'

class Loginpage extends PureComponent  {
  handleSubmit = (data) => {
    this.props.login(data.email, data.password)
	}
 render() {
  return (
    
    <div className="login_container">
        <div className="login_title_logo">
          <img src={logo} className='logoStyle' alt=''/>
          <div className="login_title_top">SOCIALSCREEN</div> 
        </div>
      <LoginForm onSubmit={ this.handleSubmit }/>
      { this.props.error && 
          <span style={{color:'red'}}>{this.props.error}</span> }
        {this.props.currentUser && <Redirect to="/instagram" />}
    </div>
  )
 }}

 const mapStateToProps = function (state) {
	return {
		currentUser: state.currentUser,
    error: state.login.error
	}
}

 export default connect(mapStateToProps, { login })(Loginpage)