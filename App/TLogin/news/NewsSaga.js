import { take, cancel, takeEvery, takeLatest, put, call, fork, select, all, spawn, race } from 'redux-saga/effects'
import * as types from './NewsConstant'
import { request, _getToken } from '../../utils/api'
import { getAuthenticationToken } from '../../Services/storage'

function* getMyComments() {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`toilet/api/news`)

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

export default function *root() {
  yield all([
    fork(watchGetMyComments)
  ])
}