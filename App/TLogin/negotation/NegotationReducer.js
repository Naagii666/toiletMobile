import { fromJS } from 'immutable'
import * as types from './NegotationConstant'

//import { InitialState } from './ProfileInitial'
const InitialState = fromJS({
 	comment_list: {
 		loading: false,
 		data: []
 	},
 	facebook_comments: {
 		loading: false,
 		data: [],
 	}
})

export default function NegotationReducer(state = InitialState, action) {
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
		case types.GET_FACEBOOK_COMMENTS: {
			return state.setIn(['facebook_comments', 'fetching'], true)
		}
		case types.GET_FACEBOOK_COMMENTS_FAILED: {
			return state.setIn(['facebook_comments', 'fetching'], false)
		}
		case types.GET_FACEBOOK_COMMENTS_SUCCESS: {
			return state.setIn(['facebook_comments', 'fetching'], false)
						.setIn(['facebook_comments', 'data'], fromJS(action.payload.data))
		}

		case types.ON_ADD_NEGOTATION:
			return state.setIn(['comment_list', 'loading'], true)
		case types.ON_ADD_NEGOTATION_FAILED:
			return state.setIn(['comment_list', 'loading'], false)
		case types.ON_ADD_NEGOTATION_SUCCESS: {
			// let comments = state.getIn(['comment_list', 'data'])
			// comments = comments.unshift(fromJS(action.payload.negotations))
			return state.setIn(['comment_list', 'loading'], false)
						//.setIn(['comment_list', 'data'], comments)
		}
		default:
			return state
	}
}
