import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPlants } from "../../services/PlantService";
import Navbar from "../../components/misc/NavBar/NavBar";
import PlantCard from "../../components/PlantCard/PlantCard";
import './PlantsList.css'

const PlantsList = () => {
  const [plants, setPlants] = useState([]);
  //const navigate = useNavigate()

  useEffect(() => {
    getAllPlants()
      .then((plants) => {
        setPlants(plants);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="row gy-4 gx-4">
    <Navbar />
    <div className='all-plants'>
        {
          plants.map((plant) => {
            return  (
                <div key={plant._id}>
                <PlantCard plant={plant} />
                </div>
            )
            
          })}
      </div>
    </div>
  );
};

export default PlantsList;
