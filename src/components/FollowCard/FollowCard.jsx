import React from 'react';
import './FollowCard.css'

const FollowCard = ({follow}) => {
    return (
        <div className='FollowCard'>
            <img src={follow.image}/>
            <p style={{marginRight:'10px'}}>{follow.userName}</p> <p>-</p>
            <p style={{fontSize:'12px', marginLeft:'10px', fontWeight:'bold'}}>{follow.fullName}</p>            
        </div>
    );
};

export default FollowCard;