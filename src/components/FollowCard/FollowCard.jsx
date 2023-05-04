import React from 'react';
import './FollowCard.css'
import { Link } from 'react-router-dom';

const FollowCard = ({follow}) => {
    return (
        <>
        <div className='FollowCard'>
            <img src={follow.image}/>
            <Link to={`/profile/${follow.id}`} style={{display:'flex', textDecoration:'none', color:'black', alignItems:'center'}}>
                <p style={{marginRight:'10px'}}>{follow.userName}</p> <p>-</p>
            </Link>
            <p style={{fontSize:'12px', marginLeft:'10px', fontWeight:'bold'}}>{follow.fullName}</p>            
        </div>
        </>
    );
};

export default FollowCard;  