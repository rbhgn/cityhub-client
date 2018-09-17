import { NEW_SCRAPE_SESSION_SUCCESS, GET_SCRAPE_SESSIONS_SUCCESS } from '../actions/scraper'
import { USER_LOGOUT} from '../actions/users'
import update from 'react-addons-update'
const moment = require('moment')
moment().format();

const getNextScrape = (date) => {
  return moment(date).add(180, 'm').format('YYYY-MM-DD HH:mm:ss')
}
const initialState = {
  latestSession: false, 
  succesfullScrapes: [], 
  nextScrape: false,
  now: false,
  diff: false,
  scrapePermission: false 
}

export default function (state = initialState, {type, payload}, ) {
	switch (type) {
    case GET_SCRAPE_SESSIONS_SUCCESS:
    const nextScrape = getNextScrape(payload.latestSession.createdAt)
    const now = moment().format('YYYY-MM-DD HH:mm:ss')
    const diff = moment(nextScrape).diff(moment(now)) / 1000
    const scrapePermission = diff < 0 ? true : false
      return update(state, {
        latestSession:{$set: payload.latestSession},
        succesfullScrapes:{$set: payload.succesfullScrapes},
        nextScrape: {$set: nextScrape},
        now:{$set: now},
        diff:{$set: diff},
        scrapePermission: {$set:scrapePermission}
      })
    case NEW_SCRAPE_SESSION_SUCCESS:
    const nextScrapeS = getNextScrape(payload.latestSession.createdAt)
    const nowS = moment().format('YYYY-MM-DD HH:mm:ss')
    const diffS = moment(nextScrapeS).diff(moment(nowS)) / 1000
    const scrapePermissionS = diffS < 0 ? true : false
      return update(state, {
        latestSession:{$set: payload.latestSession},
        nextScrape: {$set: nextScrapeS},
        now:{$set: nowS},
        diff:{$set: diffS},
        scrapePermission: {$set:scrapePermissionS}
      })
    case USER_LOGOUT:
      return initialState
		default:
      return state
	}
}