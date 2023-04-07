
import { createHttp } from './BaseService';

const authenticatedHttp = createHttp(true);

export const getAllPlants = () => authenticatedHttp.get('/plants');
export const getPlantDetail = (id) => authenticatedHttp.get(`/plants/${id}`)