import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { signup } from '../../actions/users'
import {Redirect} from 'react-router-dom'
import SignupForm from './SignupForm';
import './Signup.css'
import logo from '../../img/cityhub-logo-black.svg'

class SignupPage extends PureComponent  {
    handleSubmit = (data) => {
		this.props.postSignup(data)
	}
    render() {
        if (this.props.signup.success) return (
			<Redirect to="/login" />
		)
        return (
            <div className="signup_container">
                <div className="signup_title_logo">
                    <img src={logo} className='logoStyle' alt=''/>
                    <div className="signup_title_top">SOCIALSCREEN</div> 
                </div>
            <SignupForm onSubmit={ this.handleSubmit } />
            </div>
        )
    }
}

const mapStateToProps = function (state) {
	return {
		signup: state.signup
	}
}

export default connect(mapStateToProps, {postSignup: signup})(SignupPage)