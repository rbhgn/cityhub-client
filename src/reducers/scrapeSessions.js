import { NEW_SCRAPE_SESSION_SUCCESS, GET_SCRAPE_SESSIONS_SUCCESS } from '../actions/scraper'
import update from 'react-addons-update'

export default function (state = { latestSession: {}, succesfullScrapes: [] }, {type, payload}) {
	switch (type) {
    case GET_SCRAPE_SESSIONS_SUCCESS:
      return update(state, {$set: payload})
    case NEW_SCRAPE_SESSION_SUCCESS:
      return update(state, {latestSession: {$set: payload.latestSession}})
		default:
      return state
	}
}