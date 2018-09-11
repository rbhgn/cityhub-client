import { POST_EVENT_SUCCESS, GET_EVENTS_SUCCESS, DELETE_EVENT_SUCCESS} from '../actions/events'

export default function (state = [], {type, payload}) {
	switch (type) {
		case GET_EVENTS_SUCCESS:
      return payload
    case POST_EVENT_SUCCESS:
      return [...state, payload]
    case DELETE_EVENT_SUCCESS:
      return state.filter(({ id }) => id !== payload.id);
		default:
      return state
	}
}