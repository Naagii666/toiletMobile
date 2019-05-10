import { take, cancel, takeEvery, takeLatest, put, call, fork, select, all, spawn, race } from 'redux-saga/effects'
import * as types from './ProductsConstant'
import { request } from '../../utils/api'
import { getAuthenticationToken } from '../../Services/storage'

function* onSaveFirebaseToken({ payload }) {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).post(`toilet/api/user/firebase`, {
			firebase_token: payload
		})
	} catch(e) {
		//alert(e.message)
	}
}

function* getMyComments() {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`toilet/api/products`)

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

function* watchOnSaveFirebaseToken() {
	yield takeLatest(types.ON_SAVE_FIREBASE_TOKEN, onSaveFirebaseToken)
}

export default function *root() {
  yield all([
    fork(watchGetMyComments),
    fork(watchOnSaveFirebaseToken),
  ])
}