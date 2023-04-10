import { createHttp } from './BaseService';

const authenticatedHttp = createHttp(true);

export const getCurrentUser = () => authenticatedHttp.get('/users/me')
export const editCurrentUser = (id, user) => authenticatedHttp.post(`/users/${id}/edit`, user)