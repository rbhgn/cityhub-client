import React, {PureComponent} from 'react'

export default class SignupForm extends PureComponent  {
    state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
    }
    
    handleChange = (event) => {
        const { name, value } = event.target
    
        this.setState({
          [name]: value
        })
      }
 render() {
  return (
    <div>
      <form onSubmit={ this.handleSubmit }>
      <div>
        <div>
          <div>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={ this.state.email || '' } 
              onChange={ this.handleChange }
              autoComplete="email"
              className="signup_textfield"
            />
          </div>
          <div>
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={ this.state.password || '' } 
              onChange={ this.handleChange }
              autoComplete="new-password"
              className="signup_textfield"
            />
          </div>

          <div>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="ConfirmPassword" 
              value={ this.state.confirmPassword || '' } 
              onChange={ this.handleChange }
              autoComplete="new-password"
              className="signup_textfield"
            />
          </div>

          <div>
 
          <button type="submit" className="signup_button">Sign Up</button>
          </div>
          {
                this.state.password && this.state.confirmPassword && this.state.password !== this.state.confirmPassword ?
                        <p style={{color:'red'}}>The passwords do not match!</p> : <p>    </p>
            }
        </div>

      </div>
      </form>
    </div>
  )
 }}