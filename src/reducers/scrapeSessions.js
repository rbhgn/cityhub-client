import { NEW_SCRAPE_SESSION_SUCCESS, GET_SCRAPE_SESSIONS_SUCCESS } from '../actions/scraper'
import { USER_LOGOUT} from '../actions/users'
import update from 'react-addons-update'

export default function (state = { latestSession: false, succesfullScrapes: [] }, {type, payload}) {
	switch (type) {
    case GET_SCRAPE_SESSIONS_SUCCESS:
      return update(state, {$set: payload})
    case NEW_SCRAPE_SESSION_SUCCESS:
      return update(state, {latestSession: {$set: payload.latestSession}})
    case USER_LOGOUT:
      return null
		default:
      return state
	}
}