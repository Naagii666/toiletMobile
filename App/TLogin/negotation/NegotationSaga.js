import { take, cancel, takeEvery, takeLatest, put, call, fork, select, all, spawn, race } from 'redux-saga/effects'
import * as types from './NegotationConstant'
const queryString = require('query-string');
import { request, _getToken } from '../../utils/api'
import { getAuthenticationToken } from '../../Services/storage'
import { NavigationActions } from 'react-navigation'

function* getFacebookComments() {
	try {
		let token = yield getAuthenticationToken()
		var res = yield request(token).get(`toilet/api/informationspread`)

		if(!res.data.success) {
			return yield put({
				type: types.GET_FACEBOOK_COMMENTS_FAILED
			})
		}

		return yield put({
			type: types.GET_FACEBOOK_COMMENTS_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.GET_FACEBOOK_COMMENTS_FAILED
		})
	}
}
function* onAddNegotation({ payload }) {
	 try {
		let token = yield getAuthenticationToken()
		//let params = queryString.parse(payload)
		let res = yield request(token).get(`toilet/api/negotations/save_store`, {
			params: {
				products_id: payload.product.products_id,
				client_firstname: payload.firstName,
				client_lastname: payload.client_lastName,
				register: payload.register,
				status_id: payload.statusName,
				products_count: payload.products_count
			}
		})
		
		if(!res.data.success) {
			return yield put({
				type: types.ON_ADD_NEGOTATION_FAILED
			})
		}

		yield put({
			type: types.ON_ADD_NEGOTATION_SUCCESS,
			payload: res.data
		})

		yield put({
			type: types.GET_MY_COMMENTS
		})

		yield put(NavigationActions.back())
	 } catch(e) {
		// alert(e.message)
		alert(e.message)
		yield put({
			type: types.ON_ADD_NEGOTATION_FAILED
		})
	 }
	}
function* getMyComments() {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`toilet/api/negotations`)

		if(!res.data.success) {
			return yield put({
				
				type: types.GET_MY_COMMENTS_FAILED
			})
		}

		return yield put({
			type: types.GET_MY_COMMENTS_SUCCESS,
			payload: res.data
		})
	} catch(e) {
		alert(e.message)
		yield put({
			type: types.GET_MY_COMMENTS_FAILED
		})
	}
	
	
	// yield put({
	//   	type: types.GET_MY_COMMENTS_SUCCESS,
	//   	payload: {
	//   		comments
	//   	}
	// })
}

function* watchGetMyComments() {
    yield takeEvery(types.GET_MY_COMMENTS, getMyComments)
}

function* watchGetFacebookComments() {
	yield takeEvery(types.GET_FACEBOOK_COMMENTS, getFacebookComments)
}

function* watchAddNegotation() {
	yield takeEvery(types.ON_ADD_NEGOTATION, onAddNegotation)
}

export default function *root() {
  yield all([
    fork(watchGetMyComments),
		fork(watchGetFacebookComments),
		fork(watchAddNegotation),
  ])
}