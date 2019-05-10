import { fromJS } from 'immutable'
import * as types from './CommentConstant'

//import { InitialState } from './ProfileInitial'
const InitialState = fromJS({
 	comment_list: {
 		loading: false,
 		data: []
 	},
 	current_comment: {
 		fetching: false,
 	}
})

export default function CommentReducer(state = InitialState, action) {
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
		case types.ON_ADD_COMMENT:
			return state.setIn(['current_comment', 'fetching'], true)
		case types.ON_ADD_COMMENT_FAILED:
			return state.setIn(['current_comment', 'fetching'], false)
		case types.ON_ADD_COMMENT_SUCCESS: {
			let { comment } = action.payload
			let comment_list = state.getIn(['comment_list', 'data'])
			comment_list = comment_list.push(fromJS(comment))
			return state.setIn(['current_comment', 'fetching'], false)
						.setIn(['comment_list', 'data'], comment_list)
		}
		default:
			return state
	}
}
