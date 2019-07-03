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
 	},
 	selected_negotiation: {
 		fetching: false,
 		data: {},
 	},
 	current_invoice: {
 		fetching: false,
 	},
 	current_status: {
 		fetching: false,
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

		case types.ON_EDIT_NEGOTATION:
			return state.setIn(['comment_list', 'loading'], true)
		case types.ON_EDIT_NEGOTATION_FAILED:
			return state.setIn(['comment_list', 'loading'], false)
		case types.ON_EDIT_NEGOTATION_SUCCESS: {
			// let comments = state.getIn(['comment_list', 'data'])
			// comments = comments.unshift(fromJS(action.payload.negotations))
			return state.setIn(['comment_list', 'loading'], false)
						//.setIn(['comment_list', 'data'], comments)
		}	
		case types.ON_SEND_INVOICE:
			return state.setIn(['current_invoice', 'fetching'], true)
		case types.ON_SEND_INVOICE_FAILED:
			return state.setIn(['current_invoice', 'fetching'], false)
		case types.ON_SEND_INVOICE_SUCCESS: {
			let { id } = action.payload
			let comment_list = state.getIn(['comment_list', 'data'])
			comment_list = comment_list.push(fromJS(id))
			return state.setIn(['current_invoice', 'fetching'], false)
						.setIn(['comment_list', 'data'], comment_list)
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
		case types.ON_RENEW:
			return state.setIn(['current_status', 'fetching'], true)
		case types.ON_RENEW_FAILED:
			return state.setIn(['current_status', 'fetching'], false)
		case types.ON_RENEW_SUCCESS: {
			// let { id } = action.payload
			// let comment_list = state.getIn(['comment_list', 'data'])
			// comment_list = comment_list.push(fromJS(id))
			return state.setIn(['current_status', 'fetching'], false)
						// .setIn(['comment_list', 'data'], comment_list)
		}
		case types.ON_CANCEL:
			return state.setIn(['current_status', 'fetching'], true)
		case types.ON_CANCEL_FAILED:
			return state.setIn(['current_status', 'fetching'], false)
		case types.ON_CANCEL_SUCCESS: {
			// let { id } = action.payload
			// let comment_list = state.getIn(['comment_list', 'data'])
			// comment_list = comment_list.push(fromJS(id))
			return state.setIn(['current_status', 'fetching'], false)
						// .setIn(['comment_list', 'data'], comment_list)
			
		}
		case types.ON_SET_SELECTED_NEGOTIATION: {
			return state.setIn(['selected_negotiation', 'data'], fromJS(action.payload))
		}
		default:
			return state
	}
}
