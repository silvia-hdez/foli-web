import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);

export const getCurrentUser = () => authenticatedHttp.get("/users/me");
export const editCurrentUser = (user) =>
  authenticatedHttp.post(`/users/edit`, user);
export const getOtherUser = (userId) => authenticatedHttp.get(`/users/${userId}`)


export const followUser = (userId) => authenticatedHttp.post(`/users/${userId}/follow`)
export const unFollowUser = (userId) => authenticatedHttp.post(`/users/${userId}/unFollow`)
