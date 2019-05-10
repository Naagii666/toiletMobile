import * as types from './NegotationConstant'

export function getMyComments() { return { type: types.GET_MY_COMMENTS }}
export function getFacebookComments() { return { type: types.GET_FACEBOOK_COMMENTS }}

export function onAddNegotation(payload) { return { type: types.ON_ADD_NEGOTATION, payload }}