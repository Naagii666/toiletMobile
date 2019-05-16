import { fromJS } from 'immutable'
import * as types from './ProductsConstant'

//import { InitialState } from './ProfileInitial'
const InitialState = fromJS({
 	comment_list: {
 		loading: false,
 		data: []
 	},
 	locations: {
 		cities: [],
 		districts: [],
 		khoroos: [],
 	}
})

export default function ProductsReducer(state = InitialState, action) {
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

		case types.GET_LOCATIONS_SUCCESS: {
			return state.setIn(['locations', 'cities'], fromJS(action.payload.result.cities))
						.setIn(['locations', 'districts'], fromJS(action.payload.result.district))
						.setIn(['locations', 'khoroos'], fromJS(action.payload.result.khoroos))
		}
		default:
			return state
	}
}
