import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getNewInstaPics } from '../../actions/scraper'
import { getInstagram, updateInstagram, getInstagramAll } from '../../actions/instagram'
import InstagramRender from './InstagramRender'
import './Instagram.css'
import MenuContainer from '../Menu/MenuContainer';
import { getSettings } from '../../actions/settings'

class InstagramContainer extends PureComponent {

  handleUpdateInstagram = (id, location) => {
    this.props.updateInstagram(id, location, this.props.limit)
  }

  handleLoadInstagram = () => {
    getNewInstaPics()
  }

  toggleView = () => {
    this.props.limit === 'none' ? this.props.getInstagram(this.props.location) : this.props.getInstagramAll(this.props.location)
  }

  componentDidMount() {
    this.props.getInstagram(this.props.location)
    this.props.getSettings(this.props.location)
  }

  render() {
    return(
      <div>
      <MenuContainer />
{    this.props.instagram && <InstagramRender data={ this.props.instagram } handleUpdateInstagram={ this.handleUpdateInstagram }handleLoadInstagram={ this.handleLoadInstagram } location={ this.props.location } setScroll={ this.setScroll }/>}


    { this.props.limit === 'none' &&  <button onClick={ this.toggleView } className="instagram_load_button">Show Social Screen Images Only</button> }

        { this.props.limit !== 'none' &&  <button onClick={ this.toggleView } className="instagram_load_button">Show All Images</button> }
    </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    location: state.currentUser ? state.currentUser.location : false,
    instagram: state.instagram.data,
    limit: state.instagram.limit
  }
}

export default connect(mapStateToProps, { getNewInstaPics, getInstagram, updateInstagram, getSettings, getInstagramAll})(InstagramContainer)