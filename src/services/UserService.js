import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);

export const getCurrentUser = () => authenticatedHttp.get("/users/me");
export const editCurrentUser = (user) =>
  authenticatedHttp.post(`/users/edit`, user);
export const getOtherUser = (userId) => authenticatedHttp.get(`/users/${userId}`)
