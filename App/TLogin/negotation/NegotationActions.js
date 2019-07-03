import * as types from './NegotationConstant'

export function getMyComments() { return { type: types.GET_MY_COMMENTS }}
export function getFacebookComments() { return { type: types.GET_FACEBOOK_COMMENTS }}

export function onAddNegotation(payload) { return { type: types.ON_ADD_NEGOTATION, payload }}
export function onEditNegotation(payload) { return { type: types.ON_EDIT_NEGOTATION, payload }}
export function onSendInvoice(payload) { return { type: types.ON_SEND_INVOICE, payload }}
export function onRenew(payload) { return { type: types.ON_RENEW, payload }}
export function onCancel(payload) { return { type: types.ON_CANCEL, payload }}
export function onSetSelectedNegotiation(payload ) { return { type: types.ON_SET_SELECTED_NEGOTIATION, payload }}
