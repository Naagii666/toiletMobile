import * as types from './CommentConstant'

export function getMyComments() { return { type: types.GET_MY_COMMENTS }}
export function onAddComment(payload,data) { return { type: types.ON_ADD_COMMENT, payload,data }}