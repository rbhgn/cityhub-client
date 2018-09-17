import * as request from 'superagent'
import { baseUrl } from '../constants.js'
import { isExpired } from '../jwt'
import { logout } from './users'

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

export const newScrapeSession = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  const location = state.currentUser.location
  request
  .post(`${baseUrl}/scrapesession`)
  .set('Authorization', `Bearer ${jwt}`)
  .send({location})
  .then(result => dispatch(newScrapeSessionSuccess(result.body)))
  .catch(err => console.log(err.status)) 
}

export const getScrapeSessions = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
  .get(`${baseUrl}/scrapesession`)
  .set('Authorization', `Bearer ${jwt}`)
  .then(result => dispatch(getScrapeSessionsSuccess(result.body)))
  .catch(err => console.log(err.status)) 
}
