import { createHttp } from './BaseService';

const authenticatedHttp = createHttp(true);

export const getCurrentUser = () => authenticatedHttp.get('/users/me')