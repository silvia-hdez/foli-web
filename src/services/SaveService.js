// import { createHttp } from './BaseService';

// const authenticatedHttp = createHttp(true)

export const postSavePlant = (plantId) =>
  authenticatedHttp.post(`/plants/save/${plantId}`);
export const getSavePlants = () => authenticatedHttp.get("/save-plants");
