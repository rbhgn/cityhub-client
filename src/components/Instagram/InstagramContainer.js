import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { newScrapeSession, getScrapeSessions } from '../../actions/scraper'
import { getInstagram, updateInstagram, getInstagramAll } from '../../actions/instagram'
import InstagramRender from './InstagramRender'
import './Instagram.css'
import MenuContainer from '../Menu/MenuContainer';
import { getSettings } from '../../actions/settings'


class InstagramContainer extends PureComponent {

  handleUpdateInstagram = (id, location) => {
    this.props.updateInstagram(id, location, this.props.limit)
  }

  toggleView = () => {
    this.props.limit === 'none' ? this.props.getInstagram(this.props.location) : this.props.getInstagramAll(this.props.location)
  }

  componentDidMount() {
    this.props.getScrapeSessions()
    this.props.getInstagram(this.props.location)
    this.props.getSettings(this.props.location)
    this.props.scrapeSettings &&  setTimeout(() => this.props.scrapeSettings.scrapePermission && this.props.newScrapeSession(), 5000 ) 
  }

  componentWillUnmount() {
    this.setState({scrapingTimerOn: false})
  }

  renderScraper = () => {
    return (
      <div className="scraping_div">Looking for new Instagram Items</div>
    )
  }
  render() {
    return(
      <div>
      <MenuContainer />

{    this.props.instagram && !this.props.scrapeSettings.scrapePermission && <InstagramRender data={ this.props.instagram } handleUpdateInstagram={ this.handleUpdateInstagram } toggleView={ this.toggleView } limit={ this.props.limit }location={ this.props.location } setScroll={ this.setScroll }/>}
{  this.props.scrapeSettings.scrapePermission &&  this.renderScraper() }
    </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    location: state.currentUser ? state.currentUser.location : false,
    instagram: state.instagram.data,
    limit: state.instagram.limit,
    scrapeSettings: state.scrapeSessions
  }
}

export default connect(mapStateToProps, { newScrapeSession, getScrapeSessions, getInstagram, updateInstagram, getSettings, getInstagramAll})(InstagramContainer)