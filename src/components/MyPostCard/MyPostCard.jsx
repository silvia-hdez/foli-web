import React from 'react';
import './MyPostCard.css'
import { Link } from 'react-router-dom';

const MyPostCard = ({post}) => {
    return (
        <div className='MyPostCard'>
        <Link to={`/posts/${post._id}`}>
            <img src={post.image[0].url}/>
        </Link>
        </div>
    );
};

export default MyPostCard;