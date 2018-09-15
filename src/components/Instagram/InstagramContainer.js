import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { newScrapeSession, getScrapeSessions } from '../../actions/scraper'
import { getInstagram, updateInstagram, getInstagramAll } from '../../actions/instagram'
import InstagramRender from './InstagramRender'
import './Instagram.css'
import MenuContainer from '../Menu/MenuContainer';
import { getSettings } from '../../actions/settings'

const newScrapeSessionRefreshTime = 60  * 60//minutes

class InstagramContainer extends PureComponent {

  handleUpdateInstagram = (id, location) => {
    this.props.updateInstagram(id, location, this.props.limit)
  }

  toggleView = () => {
    this.props.limit === 'none' ? this.props.getInstagram(this.props.location) : this.props.getInstagramAll(this.props.location)
  }

  checkIfScrape = () => {
    const latestSession = new Date(this.props.scrapeSettings.latestSession.createdAt)
    if (!isNaN(latestSession)) {
      const late = (latestSession / 1) + (120 * 60 * 1000)
      const now = new Date() / 1
      const diff = Math.floor(((now - late)) / 1000)
      if (diff - newScrapeSessionRefreshTime > 0) {
        this.props.newScrapeSession()
        console.log('Scraping')
      } else {
        console.log((newScrapeSessionRefreshTime  - diff) +' seconds to Scrape')
      }
    }
  }
  componentDidMount() {
    this.props.getInstagram(this.props.location)
    this.props.getSettings(this.props.location)
    this.props.getScrapeSessions()
    this.props.scrapeSettings && this.checkIfScrape()
  }

  render() {
    return(
      <div>
      <MenuContainer />

{    this.props.instagram && <InstagramRender data={ this.props.instagram } handleUpdateInstagram={ this.handleUpdateInstagram } toggleView={ this.toggleView } limit={ this.props.limit }location={ this.props.location } setScroll={ this.setScroll }/>}



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