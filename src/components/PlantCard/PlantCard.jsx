import React from 'react';
import './PlantCard.css'
import { Link } from 'react-router-dom';

const PlantCard = ({plant}) => {
    
    return (
       
      <div className='plant-card'>
            <img src={plant.image}/>
            <p>{plant.commonName}</p>
            <Link to={`/plants/${plant._id}`}>Details</Link>
        </div>

  );
};

export default PlantCard;