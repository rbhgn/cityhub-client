import { GET_HOST_DATA_SUCCESS } from '../actions/host'

export default function (state = {}, {type, payload}) {
	switch (type) {
		case GET_HOST_DATA_SUCCESS:
			return payload.result
		default:
      return state
	}
}