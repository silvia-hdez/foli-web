import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);

export const postComment = (comment) => authenticatedHttp.post('/new-comment', comment)

export const getComments = () => authenticatedHttp.get('/comments')

export const deleteComment = (commentId) => authenticatedHttp.delete(`/${commentId}`)

export const editComment = ({commentId, post}) => authenticatedHttp.patch(`/${commentId}`, post)
