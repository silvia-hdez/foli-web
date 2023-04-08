
import { createHttp } from './BaseService';

const authenticatedHttp = createHttp(true);

export const getAllPosts = () => authenticatedHttp.get('/posts')
export const getPostDetail = (_id) => authenticatedHttp.get(`/posts/${_id}`);

export const getAllMyPosts = () => authenticatedHttp.get('/my-posts')

export const postNewPost = () => authenticatedHttp.post('/new-post')
