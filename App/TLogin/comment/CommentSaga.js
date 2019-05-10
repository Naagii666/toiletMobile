import { take, cancel, takeEvery, takeLatest, put, call, fork, select, all, spawn, race } from 'redux-saga/effects'
import * as types from './CommentConstant'
import { request, _getToken } from '../../utils/api'
import { getAuthenticationToken } from '../../Services/storage'
import { NavigationActions } from 'react-navigation'

function* onAddComment({ payload }) {
	try {
		let token = yield getAuthenticationToken()
		
		let res = yield request(token).get(`toilet/api/comment/save_comment?commend=${payload}`)

		if(!res.data.success) {
			return yield put({
				type: types.ON_ADD_COMMENT_FAILED
			})
		}

		yield put({
			type: types.ON_ADD_COMMENT_SUCCESS,
			payload: res.data
		})
		yield put(NavigationActions.back())
	} catch(e) {
		alert(e.message)
		//alert(e.message)
		yield put({
			type: types.ON_ADD_COMMENT_FAILED
		})
	}
}

function* getMyComments() {
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).get(`toilet/api/comment`)

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

function* watchOnAddComment() {
	yield takeLatest(types.ON_ADD_COMMENT, onAddComment)
}

export default function *root() {
  yield all([
    fork(watchGetMyComments),
    fork(watchOnAddComment),
  ])
}