import * as request from 'superagent'
import { baseUrl } from '../constants.js'
import { isExpired } from '../jwt'
import { logout } from './users'

export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS'
export const UPDATE_SETTINGS_SUCCESS = 'UPDATE_SETTINGS_SUCCESS'

const getSettingsSuccess = (data) => ({
  type: GET_SETTINGS_SUCCESS,
  payload: data
})


const updateSettingsSuccess = (data) => ({
  type: UPDATE_SETTINGS_SUCCESS,
  payload: data
})


export const getSettings = () => (dispatch, getState) => {
  const state = getState()
  const location = state.currentUser.location
  request
    .get(`${baseUrl}/settings/${location}`)
    .then(result => dispatch(getSettingsSuccess(result.body)))
    .catch(err => console.error(err))
}

export const getSettingsScreen = (location) => (dispatch) => {
  request
    .get(`${baseUrl}/settings/${location}`)
    .then(result => dispatch(getSettingsSuccess(result.body)))
    .catch(err => console.error(err))
}


export const updateSettings = (id, data) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .patch(`${baseUrl}/settings`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({id, data})
    .then(result => dispatch(updateSettingsSuccess(result.body)))
    .catch(err => console.error(err))
}