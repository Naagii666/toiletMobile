import { take, cancel, takeEvery, takeLatest, put, call, fork, select, all, spawn, race } from 'redux-saga/effects'
import * as types from './NegotationConstant'
const queryString = require('query-string');
import { request, _getToken } from '../../utils/api'
import { getAuthenticationToken } from '../../Services/storage'
import { NavigationActions } from 'react-navigation'
import { Alert} from 'react-native'

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
function* onSendInvoice({payload}){
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).post(`toilet/api/send_invoice?id=${payload}`)
		if(!res.data.success) {
			return yield put({
				type: types.ON_SEND_INVOICE_FAILED
			})
		}
		yield put({
			type: types.ON_SEND_INVOICE_SUCCESS,
			payload: res.data
		})

	 } catch(e) {
		alert(e.message)
		yield put({
			type: types.ON_SEND_INVOICE_FAILED
		})
	 }
}
function* onRenew({payload}){
	// alert(payload)
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).post(`toilet/api/renew_status?id=${payload}`)
		// alert(res.data.message)
		Alert.alert("Мэдэгдэл", res.data.message);
		if(!res.data.success) {
			return yield put({
				type: types.ON_RENEW_FAILED
			})
		}
		yield put({
			type: types.ON_RENEW_SUCCESS,
			payload: res.data
		})
		yield put(NavigationActions.back())
		yield put(NavigationActions.back())
	 } catch(e) {
		alert(e.message)
		yield put({
			type: types.ON_RENEW_FAILED
		})
	 }
}
function* onCancel({payload}){
	
	try {
		let token = yield getAuthenticationToken()
		let res = yield request(token).post(`toilet/api/cancel_status?id=${payload}`)
		Alert.alert("Мэдэгдэл", res.data.message);
		if(!res.data.success) {
			return yield put({
				type: types.ON_CANCEL_FAILED
			})
		}
		yield put({
			type: types.ON_CANCEL_SUCCESS,
			payload: res.data
		})
		// getFacebookComments()
		yield put(NavigationActions.back())
		yield put(NavigationActions.back())
	 } catch(e) {
		alert(e.message)
		yield put({
			type: types.ON_CANCEL_FAILED
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
		formData.append('products', JSON.stringify(payload.selected_products.map((product) => { return { product_id: product.products_id, price: product.products_price, quantity: product.quantity }})))
		formData.append('deleted_photos', JSON.stringify(payload.deleted_photos.map((deleted_photos) => { return { photo_uri:deleted_photos.photo ,id:deleted_photos.id}})))

		for(i=0;i<3;i++){
			if(payload.photo[i]){
				formData.append('photo'+[i],{
					uri:	payload.photo[i].uri,
					type:	'image/jpeg',
					name:	payload.photo[i].fileName,
				});
			}
		}
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
		let registry_number = payload.is_company == 1 ? (payload.register_first + payload.register_second + payload.register) : payload.register

		var formData = new FormData();
		formData.append('customer_firstname', payload.firstName)
		formData.append('customer_lastname', payload.client_lastName)
		formData.append('customer_registrynumber', registry_number)
		formData.append('email', payload.email)
		formData.append('customer_phone', payload.phone)
		formData.append('description', payload.description)
		formData.append('pre_payment_percentage', payload.pre_payment_percentage)
		formData.append('loan_month', payload.loan_month)
		formData.append('status', payload.statusName)
		formData.append('products', JSON.stringify(payload.selected_products.map((product) => { return { product_id: product.products_id, price: product.products_price, quantity: product.quantity }})))
		formData.append('city_id', payload.city_id)
		formData.append('district_id', payload.district_id)
		formData.append('khoroo_id', payload.khoroo_id)
		formData.append('is_company', payload.is_company)
		// payload.photo.forEach(photo => {
		// 	let i=0
		// 	let sendName='photo'+[i]
		// 	i=i+1
		// 	formData.append(sendName,{
		// 		uri:	photo.uri,
		// 		type:	'image/jpeg',
		// 		name:	photo.fileName,
		// 	});
		// })
		for(i=0;i<3;i++){
			if(payload.photo[i]){
				formData.append('photo'+[i],{
					uri:	payload.photo[i].uri,
					type:	'image/jpeg',
					name:	payload.photo[i].fileName,
				});
			}
		}
		// formData.append('photo', payload.photo)
		// formData.append('photo', JSON.stringify(payload.photo.map((photo) => { return { 
		// 	uri:	photo.uri,
		// 	type:	'image/jpeg',
		// 	name:	photo.fileName, }})))
		//let params = queryString.parse(payload)

		// const data = new FormData()

		// payload.photo.forEach((photo) => {
  		// const newFile = {
		// 	uri:	photo.uri,
		// 	type:	'image/jpeg',
		// 	name:	photo.fileName,
  		// }
  		// formData.append('photo', newFile)
		// });
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

function* watchOnSendInvoice() {
	yield takeEvery(types.ON_SEND_INVOICE, onSendInvoice)
}
function* watchOnRenew() {
	yield takeEvery(types.ON_RENEW, onRenew)
}
function* watchOnCancel() {
	yield takeEvery(types.ON_CANCEL, onCancel)
}

export default function *root() {
  yield all([
    fork(watchGetMyComments),
		fork(watchGetFacebookComments),
		fork(watchAddNegotation),
		fork(watchEditNegotation),
		fork(watchOnSendInvoice),
		fork(watchOnRenew),
		fork(watchOnCancel),
  ])
}