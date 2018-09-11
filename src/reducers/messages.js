import { POST_MESSAGE_SUCCESS, GET_MESSAGES_SUCCESS, DELETE_MESSAGE_SUCCESS} from '../actions/messages'

export default function (state = [], {type, payload}) {
	switch (type) {
		case GET_MESSAGES_SUCCESS:
      return payload
    case POST_MESSAGE_SUCCESS:
      return [...state, payload]
    case DELETE_MESSAGE_SUCCESS:
    return state.filter(({ id }) => id !== payload.id);
		default:
      return state
	}
}