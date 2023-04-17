import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);

export const postComment = (comment) =>
  authenticatedHttp.post("/new-comment", comment);

export const getComments = (postId) =>
  authenticatedHttp.get("/comments", postId);

export const deleteComment = (commentId) =>
  authenticatedHttp.delete(`/${commentId}`);

export const editComment = ({ commentId, content }) =>
  authenticatedHttp.patch(`/${commentId}`, { content });
