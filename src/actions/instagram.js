import * as request from 'superagent'
import { baseUrl } from '../constants.js'
import { isExpired } from '../jwt'
import { logout } from './users'

export const GET_INSTAGRAM_SUCCESS = 'GET_INSTAGRAM_SUCCESS'

const getInstagramSuccess = (data) => ({
  type: GET_INSTAGRAM_SUCCESS,
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

export const updateInstagram = (id, location) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .patch(`${baseUrl}/instagram`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({id})
    .then(() => dispatch(getInstagram(location)))
    .catch(err => console.error(err))
}