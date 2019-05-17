import * as types from './NegotationConstant'

export function getMyComments() { return { type: types.GET_MY_COMMENTS }}
export function getFacebookComments() { return { type: types.GET_FACEBOOK_COMMENTS }}

export function onAddNegotation(payload) { return { type: types.ON_ADD_NEGOTATION, payload }}
export function onEditNegotation(payload) { return { type: types.ON_EDIT_NEGOTATION, payload }}
export function onSetSelectedNegotiation(payload ) { return { type: types.ON_SET_SELECTED_NEGOTIATION, payload }}
