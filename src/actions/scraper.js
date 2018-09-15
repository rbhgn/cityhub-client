import * as request from 'superagent'
import { baseUrl } from '../constants.js'

export const NEW_SCRAPE_SESSION_SUCCESS = 'NEW_SCRAPE_SESSION_SUCCESS'
export const GET_SCRAPE_SESSIONS_SUCCESS = 'GET_SCRAPE_SESSIONS_SUCCESS'


const newScrapeSessionSuccess = (data) => ({
  type: NEW_SCRAPE_SESSION_SUCCESS,
  payload: data
})

const getScrapeSessionsSuccess = (data) => ({
  type: GET_SCRAPE_SESSIONS_SUCCESS,
  payload: data
})

export const newScrapeSession = () => (dispatch) => {
  request
  .post(`${baseUrl}/scrapesession`)
  .then(result => dispatch(newScrapeSessionSuccess(result.body)))
  .catch(err => console.log(err.status)) 
}

export const getScrapeSessions = () => (dispatch) => {
  request
  .get(`${baseUrl}/scrapesession`)
  .then(result => dispatch(getScrapeSessionsSuccess(result.body)))
  .catch(err => console.log(err.status)) 
}
