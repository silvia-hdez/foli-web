import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);

export const getCurrentUser = () => authenticatedHttp.get("/users/me");
export const editCurrentUser = (user) =>
  authenticatedHttp.post(`/users/edit`, user);
