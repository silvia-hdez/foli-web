import React, { useEffect, useState } from "react";
import "./PlantCard.css";
import { Link } from "react-router-dom";
import { deleteSavePlant, getSavePlants, postSavePlant } from "../../services/SaveService";

const PlantCard = ({ plant }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [savedPlants, setSavedPlants] = useState([])

  useEffect(() => {
    getSavePlants()
      .then((plants)=>setSavedPlants(plants))
      .catch((err)=>console.log(err))
  }, [])

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    const isPlantSaved = savedPlants.some((savedPlant) => savedPlant.plant._id === plant._id);

    if(isPlantSaved) {
      const savedPlant = savedPlants.find((savedPlant) => savedPlant.plant._id === plant._id);
      deleteSavePlant(savedPlant._id)
      .then((response) => {
        console.log(response.data);
        setSavedPlants(savedPlants.filter((savedPlant) => savedPlant.plant._id !== plant._id));
      })
      .catch((err) => console.log(err));
    }
    postSavePlant(plant._id)
      .then((save) => {
      console.log(save)
      setSavedPlants([...savedPlants, save]);
      })
    
      .catch((err)=>console.log(err))
  };



  return (
    <div className="plantCard">
      <img src={plant.image} />
      <p>{plant.commonName}</p>
      <Link to={`/plants/${plant._id}`}>Details</Link>

      <button onClick={handleBookmark}>
        {isBookmarked ? (
          <i className="bi bi-bookmark-fill" style={{ fontSize: "20px", color: "rgb(109, 101, 101)" }}></i>
        ) : (
          <i className="bi bi-bookmark" style={{ fontSize: "20px", color: "rgb(109, 101, 101)" }} ></i>
        )}
      </button>
    </div>
  );
};

export default PlantCard;
