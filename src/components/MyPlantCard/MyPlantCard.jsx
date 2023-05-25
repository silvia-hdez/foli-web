import React from 'react';
import './MyPlantCard.css'
import { Link } from 'react-router-dom';

const MyPlantCard = ({plant}) => {
    return (
        <Link to={`/plants/${plant._id}`}>
        <div className='MyPostCard'>
            <p className='PlantNamePost'>{plant.commonName}</p>
            <img src={plant.image}/>
        </div>
        </Link>
    );
};

export default MyPlantCard;