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

function* onEditNegotation({ payload }) {
	try {
		let token = yield getAuthenticationToken()

		var formData = new FormData();
		formData.append('description', payload.description)
		formData.append('pre_payment_percentage', payload.pre_payment_percentage)
		formData.append('loan_month', payload.loan_month)
		formData.append('status', payload.statusName)

		//let params = queryString.parse(payload)
		let res = yield request(token).post(`toilet/api/negotations/${payload.negotiation_id}`, formData)
		
		if(!res.data.success) {
			return yield put({
				type: types.ON_EDIT_NEGOTATION_FAILED
			})
		}

		yield put({
			type: types.ON_EDIT_NEGOTATION_SUCCESS,
			payload: res.data
		})

		yield put({
			type: types.GET_MY_COMMENTS
		})

		yield put(NavigationActions.back())
		yield put(NavigationActions.back())
	 } catch(e) {
		// alert(e.message)
		alert(e.message)
		yield put({
			type: types.ON_EDIT_NEGOTATION_FAILED
		})
	 }
}

function* onAddNegotation({ payload }) {
	 try {
		let token = yield getAuthenticationToken()

		var formData = new FormData();
		formData.append('customer_firstname', payload.firstName)
		formData.append('customer_lastname', payload.client_lastName)
		formData.append('customer_registrynumber', payload.register_first + payload.register_second + payload.register)
		formData.append('customer_phone', payload.phone)
		formData.append('description', payload.description)
		formData.append('pre_payment_percentage', payload.pre_payment_percentage)
		formData.append('loan_month', payload.loan_month)
		formData.append('status', payload.statusName)
		formData.append('products', JSON.stringify(payload.selected_products.map((product) => { return { product_id: product.products_id, price: product.products_price, quantity: product.quantity }})))
		formData.append('city_id', payload.city_id)
		formData.append('district_id', payload.district_id)
		formData.append('khoroo_id', payload.khoroo_id)

		//let params = queryString.parse(payload)
		let res = yield request(token).post(`toilet/api/negotations`, formData)
		
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

function* watchEditNegotation() {
	yield takeEvery(types.ON_EDIT_NEGOTATION, onEditNegotation)
}

export default function *root() {
  yield all([
    fork(watchGetMyComments),
		fork(watchGetFacebookComments),
		fork(watchAddNegotation),
		fork(watchEditNegotation),
  ])
}