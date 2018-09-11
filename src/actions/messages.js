import * as request from 'superagent'
import { baseUrl } from '../constants.js'
import { isExpired } from '../jwt.js'
import { logout } from './users.js'

export const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS'
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS'
export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS'

const postMessageSuccess = (data) => ({
  type: POST_MESSAGE_SUCCESS,
  payload: data
})

const getMessagesSuccess = (data) => ({
  type: GET_MESSAGES_SUCCESS,
  payload: data
})

const deleteMessageSuccess = (data) => ({
  type: DELETE_MESSAGE_SUCCESS,
  payload: data
})

export const postMessage = (data) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  const location = state.currentUser.location
  if (!location) return null
  data.location = location
  request
    .post(`${baseUrl}/message/`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(result => dispatch(postMessageSuccess(result.body)))
    .catch(err => console.error(err))
}

export const getMessagesScreen = (location) => (dispatch) => {
  request
    .get(`${baseUrl}/message/${location}`)
    .then(result => dispatch(getMessagesSuccess(result.body)))
    .catch(err => console.error(err))
}

export const getMessages = () => (dispatch, getState) => {
  const state = getState()
  const location = state.currentUser.location
  request
    .get(`${baseUrl}/message/${location}`)
    .then(result => dispatch(getMessagesSuccess(result.body)))
    .catch(err => console.error(err))
}

export const deleteMessage = (id) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .delete(`${baseUrl}/message/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(deleteMessageSuccess(result.body)))
    .catch(err => console.error(err))
}