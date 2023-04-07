import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlantDetail } from '../../services/PlantService';
import Navbar from '../../components/misc/NavBar/NavBar';

const PlantDetail = () => {

    const [plant, setPlant] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        console.log(id)
        getPlantDetail(id)
            .then((plant) => setPlant(plant) )
            .catch((err) => console.log(err))
    }, [])

    if (!plant) {
        return <p> ... fetching plant</p>;
      }
    return (
        <div>
            <Navbar />
            <div>
            <img src={plant.image}/>
            <p>{plant.commonName}</p>
            </div>
        </div>
    );
};

export default PlantDetail;