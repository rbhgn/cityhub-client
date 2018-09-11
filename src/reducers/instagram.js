import { GET_INSTAGRAM_SUCCESS } from '../actions/instagram'

export default function (state = [], {type, payload}) {
	switch (type) {
		case GET_INSTAGRAM_SUCCESS:
			return payload
		default:
      return state
	}
}
