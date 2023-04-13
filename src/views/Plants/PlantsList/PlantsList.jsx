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

const PlantsList = ({all}) => {
  const [initialize, setInitialize] = useState(false)
  const [plants, setPlants] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedPlants, setSavedPlants] = useState([]);
  const [growthRate, setGrowthRate] = useState({
    "moderate": true,
    "high": true,
    "low": true,
  })
  const  [plantsCopy, setPlantsCopy] = useState([]);


  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    if (!initialize) {
      console.log('retrieve all', all)
      getSavePlants(currentUser._id)
      .then((savedPlants) => {
        setSavedPlants(savedPlants);
        if (!all) {
          const plants = savedPlants.map((savedPlant) => {
            return { ...savedPlant.plant, saved: true };
          })
          setLoading(false);
          setPlants(plants);
          setPlantsCopy(plants.map(a => {return {...a}}))
          setInitialize(true)
          
        } else {
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
          setPlantsCopy(plants.map(a => {return {...a}}))
          setInitialize(true)
        })
        .catch((err) => console.error(err));
      }
      })
      .catch((err) => console.error(err));
    }
  }, [plants, growthRate]);


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
        setPlantsCopy(plantsCopy.map(x => x._id === plant._id ? {...x, saved: false} : x))

        if(!all) {window.location.reload()}
      })
      .catch((err) => console.log(err))
    } else {
      postSavePlant(plant._id)
      .then((newSavedPlant) => {
        newSavedPlant["plant"] = plant
        savedPlants.push(newSavedPlant)
        setSavedPlants(savedPlants);

        setPlants(
          plants.map((p) => {
            if (p._id === plant._id) {
              return { ...p, saved: true };
            }
            return p;
          })
        );
        setPlantsCopy(plantsCopy.map(x => x._id === plant._id ? {...x, saved: true} : x))

      })
        .catch((err) => console.log(err))
    }

  }
  
  const handleCheckBox = (e) => {
    const growthRateName = e.target.id
    const checked = e.target.checked
    growthRate[growthRateName] = checked
    setGrowthRate( Object.assign({}, growthRate))
    //setPlantsCopy(plants.map(a => {return {...a}}))
    const filteredPlants = plantsCopy.filter((plant) => growthRate[plant["growthRate"].toLowerCase()] === true )
    setPlants(filteredPlants)
    
  }

  return (
    <div className="row gy-4 gx-4">
      { all && <Navbar />}
      { all && 
        <div>
          <label>Moderate</label><input id='moderate' checked={growthRate['moderate']} type="checkbox" onChange={(e) => handleCheckBox(e)}/>
          <label>High</label><input id='high' checked={growthRate['high']} type="checkbox" onChange={(e) => handleCheckBox(e)}/>
          <label>Low</label><input id='low' checked={growthRate['low']} type="checkbox" onChange={(e) => handleCheckBox(e)}/>
        </div>}

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
