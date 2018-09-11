import * as request from 'superagent'
import { baseUrl } from '../constants.js'
import { isExpired } from '../jwt.js'
import { logout } from './users.js'

export const POST_EVENT_SUCCESS = 'POST_EVENT_SUCCESS'
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS'
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS'

const postEventSuccess = (data) => ({
  type: POST_EVENT_SUCCESS,
  payload: data
})

const getEventsSuccess = (data) => ({
  type: GET_EVENTS_SUCCESS,
  payload: data
})

const deleteEventSuccess = (data) => ({
  type: DELETE_EVENT_SUCCESS,
  payload: data
})

export const postEvent = (data) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  const location = state.currentUser.location
  if (!location) return null
  data.location = location
  request
    .post(`${baseUrl}/event/`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(result => dispatch(postEventSuccess(result.body)))
    .catch(err => console.error(err))
}

export const getEventsScreen = (location) => (dispatch) => {
  request
    .get(`${baseUrl}/event/${location}`)
    .then(result => dispatch(getEventsSuccess(result.body)))
    .catch(err => console.error(err))
}

export const getEvents = () => (dispatch, getState) => {
  const state = getState()
  const location = state.currentUser.location
  request
    .get(`${baseUrl}/event/${location}`)
    .then(result => dispatch(getEventsSuccess(result.body)))
    .catch(err => console.error(err))
}

export const deleteEvent = (id) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .delete(`${baseUrl}/event/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(deleteEventSuccess(result.body)))
    .catch(err => console.error(err))
}