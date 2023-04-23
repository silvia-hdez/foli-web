import React from 'react';
import { Link } from 'react-router-dom';

const MyPostSaved = ({post}) => {
    return (
        <Link to={`/posts/${post._id}`}>
        <div className='MyPostCard'>
            <img src={post.image[0].url}/>
        </div>
        </Link>
    );
};

export default MyPostSaved;