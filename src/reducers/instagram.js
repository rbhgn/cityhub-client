import { GET_INSTAGRAM_SUCCESS, UPDATE_INSTAGRAM_SUCCESS } from '../actions/instagram'
import update from 'react-addons-update';

export default function (state = {data: []}, {type, payload}) {
	switch (type) {
		case GET_INSTAGRAM_SUCCESS:
			return payload
		case UPDATE_INSTAGRAM_SUCCESS:
		const index = state.data.findIndex(x => x.id === payload.id);
		return update(state, {data:{[index]:{$set: payload}}})
		default:
      return state
	}
}
