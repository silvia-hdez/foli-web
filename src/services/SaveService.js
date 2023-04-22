import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);

export const postSavePlant = (plantId) =>
  authenticatedHttp.post(`/plants/save/${plantId}`);

export const getSavedPlants = () => authenticatedHttp.get("/save-plants");

export const deleteSavePlant = (saveId) =>
  authenticatedHttp.delete(`/saves/${saveId}`);

export const postSavePost = (postId) =>
  authenticatedHttp.post(`/posts/save/${postId}`);

export const getSavePosts = () => authenticatedHttp.get("/save-posts");

export const deleteSavePost = (saveId) =>
  authenticatedHttp.delete(`/saves/${saveId}`);
