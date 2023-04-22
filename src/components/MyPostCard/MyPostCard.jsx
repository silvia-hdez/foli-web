import React from 'react';

const MyPostCard = ({post}) => {
    return (
        <div>
            <img src={post.image[0].url}/>
        </div>
    );
};

export default MyPostCard;