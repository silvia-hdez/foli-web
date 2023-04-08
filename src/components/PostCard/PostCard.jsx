import React from 'react';
import './PostCard.css'
import { Link } from 'react-router-dom';

const PostCard = ({post}) => {
    return (
        <div className='postCard'>
            {/* <img src={post.image}/> */}
            <h3>{post.name}</h3>
            <p>id: {post._id}</p>
            <p>user: {post.userPost}</p>
            <Link to={`/posts/${post._id}`}>Details</Link>
        </div>
    );
};

export default PostCard;