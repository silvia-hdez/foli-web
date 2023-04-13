import React, { useCallback, useContext, useEffect, useState } from "react";
import { getAllPlants } from "../../../services/PlantService";
import Navbar from "../../../components/misc/NavBar/NavBar";
import PlantCard from "../../../components/PlantCard/PlantCard";
import "./PlantsList.css";
import {
  deleteSavePlant,
  getSavePlants,
  postSavePlant,
} from "../../../services/SaveService";
import AuthContext from "../../../contexts/AuthContext";
import { getCurrentUser } from "../../../services/UserService";

const PlantsList = () => {
  const [initialize, setInitialize] = useState(false)
  const [counter, setCounter] = useState(0)
  const [plants, setPlants] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedPlants, setSavedPlants] = useState([]);


  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    console.log('hola')
    if (!initialize) {
      getSavePlants(currentUser._id)
      .then((savedPlants) => {
        setSavedPlants(savedPlants);

        getAllPlants()
        .then((allPlants) => {
          console.log("Saved plants: ", currentUser.saves);
          const plants = allPlants.map((plant) => {
            const isPlantSaved = savedPlants.some(
              (savedPlant) => savedPlant.plant._id === plant._id
            );
            return { ...plant, saved: isPlantSaved };
          });
          setLoading(false);
          setPlants(plants);
          setInitialize(true)
        })
        .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
    }
    setPlants(plants)
  }, [counter, plants]);


  const handleBookmark = (plant) => {
    const plantSavedList = savedPlants.filter((x) => x.plant._id == plant._id)
  
    if(plantSavedList.length > 0 ) {
      deleteSavePlant(plantSavedList[0]._id)
      .then(() => {
        setSavedPlants(savedPlants.filter((savedPlant) => savedPlant.plant._id !== plant._id));
        setPlants(
          plants.map((p) => {
            if (p._id === plant._id) {
              return { ...p, saved: false };
            }
            return p;
          })
        );
      })
      .catch((err) => console.log(err))
    } else {
      postSavePlant(plant._id)
      .then((newSavedPlant) => {
        newSavedPlant["plant"] = plant
        const a = savedPlants.concat([newSavedPlant])
        console.log(a)
        setSavedPlants(a);

        setPlants(
          plants.map((p) => {
            if (p._id === plant._id) {
              return { ...p, saved: true };
            }
            return p;
          })
        );
      })
        .catch((err) => console.log(err))
    }


  }
  


  return (
    <div className="row gy-4 gx-4">
      <Navbar />

      <div className="allPlants">
        {loading
          ? "Loading...."
          : plants.map((plant) => {
              return <PlantCard key={plant._id} plant={plant} clickHandler={() => handleBookmark(plant)} isSaved={plant.saved}/>;
            })}
      </div>
    </div>
  );
};

export default PlantsList;
