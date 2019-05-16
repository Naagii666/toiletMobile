import * as types from './ProductsConstant'

export function getMyComments() { return { type: types.GET_MY_COMMENTS }}
export function onSaveFirebaseToken(payload) { return { type: types.ON_SAVE_FIREBASE_TOKEN, payload }}
export function getLocations() { return { type: types.GET_LOCATIONS, }}