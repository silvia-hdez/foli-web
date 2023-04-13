import React, { useEffect, useState } from 'react';
import { getSavePlants } from '../../services/SaveService';
import PlantCard from '../PlantCard/PlantCard';

const MyPlantsList = () => {
    const [plants, setPlants] = useState([null])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getSavePlants()
            .then((plants) => {
                console.log(plants)
                setLoading(false)
                setPlants(plants)
            })
    }, [])

    return (
        <div>
            Mis plantas guardadas
            <div className='MySavedPlants'>
                {loading? 'Loading...' : plants.map((plant)=> {
                    return <PlantCard key={plant._id} plant={plant}/>
                })}
            </div>
        </div>
    );
};

export default MyPlantsList;