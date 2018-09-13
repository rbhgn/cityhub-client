import * as request from 'superagent'
import { baseUrl } from '../constants.js'
import { isExpired } from '../jwt'
import { logout } from './users'

export const GET_INSTAGRAM_SUCCESS = 'GET_INSTAGRAM_SUCCESS'
export const UPDATE_INSTAGRAM_SUCCESS = 'UPDATE_INSTAGRAM_SUCCESS'

const getInstagramSuccess = (data) => ({
  type: GET_INSTAGRAM_SUCCESS,
  payload: data
})

const updateInstagramSuccess = (data) => ({
  type: UPDATE_INSTAGRAM_SUCCESS,
  payload: data
})

export const getInstagram = () => (dispatch, getState) => {
  const state = getState()
  const location = state.currentUser.location
  request
    .get(`${baseUrl}/instagram/${location}`)
    .then(result => dispatch(getInstagramSuccess(result.body)))
    .catch(err => console.error(err))
}

export const getInstagramScreen = (location) => (dispatch) => {
  request
    .get(`${baseUrl}/instagram/${location}`)
    .then(result => dispatch(getInstagramSuccess(result.body)))
    .catch(err => console.error(err))
}

export const updateInstagram = (id, location, limit) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .patch(`${baseUrl}/instagram`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({id})
    .then(result => limit !== 'none' ? dispatch(getInstagram(location)) : dispatch(updateInstagramSuccess(result.body)) )
    .catch(err => console.error(err))
}

export const getInstagramAll = () => (dispatch, getState) => {
  const state = getState()
  const location = state.currentUser.location
  request
    .get(`${baseUrl}/instagrams/${location}`)
    .then(result => dispatch(getInstagramSuccess(result.body)))
    .catch(err => console.error(err))
}