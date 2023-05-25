import React from 'react';
import { Link } from 'react-router-dom';

const MyPostSaved = ({post}) => {
    console.log({post})
    return (
        <Link to={`/posts/${post._id}`}>
        <div className='MyPostCard'>
        {/* <p className='PlantNamePost'>{post.user}</p> */}
            <img src={post.image[0].url}/>
        </div>
        </Link>
    );
};

export default MyPostSaved;