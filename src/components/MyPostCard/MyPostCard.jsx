import React from 'react';
import './MyPostCard.css'

const MyPostCard = ({post}) => {
    return (
        <div className='MyPostCard'>
            <img src={post.image[0].url}/>
        </div>
    );
};

export default MyPostCard;