
import { createHttp } from './BaseService';

const authenticatedHttp = createHttp(true);

export const getAllPosts = () => authenticatedHttp.get('/posts')
export const getPostDetail = (_id) => authenticatedHttp.get(`/posts/${_id}`);

export const getAllMyPosts = () => authenticatedHttp.get('/my-posts')

export const createPost = ({name, image, description, state}) => authenticatedHttp.post('/new-post', {name, image, description, state})
