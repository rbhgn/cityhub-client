import { GET_SETTINGS_SUCCESS, UPDATE_SETTINGS_SUCCESS } from '../actions/settings'

export default function (state = {}, {type, payload}) {
	switch (type) {
    case GET_SETTINGS_SUCCESS:
      payload.updated = false
      return payload
    case UPDATE_SETTINGS_SUCCESS:
      payload.updated = true
      return payload
		default:
      return state
	}
}