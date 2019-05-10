import { fromJS } from 'immutable'
import * as types from './NewsConstant'

//import { InitialState } from './ProfileInitial'
const InitialState = fromJS({
 	comment_list: {
 		loading: false,
 		data: []
 	}  
})

export default function NewsReducer(state = InitialState, action) {
	switch (action.type) {
		case types.GET_MY_COMMENTS: {
			return state.setIn(['comment_list', 'loading'], true)
		}
		case types.GET_MY_COMMENTS_FAILED: {
			return state.setIn(['comment_list', 'loading'], false)
		}
		case types.GET_MY_COMMENTS_SUCCESS: {
			let { data } = action.payload
			return state.setIn(['comment_list', 'loading'], false)
						.setIn(['comment_list', 'data'], fromJS(data))
		}
		default:
			return state
	}
}
