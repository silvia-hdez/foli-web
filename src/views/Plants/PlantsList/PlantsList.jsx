import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedPlants, setSavedPlants] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const listAllPlants = useCallback(() => {
    getAllPlants()
      .then((plants) => {
        console.log('Saved plants: ',currentUser.saves)
        // [{ name: 'loquesea', id="12831823789123"}]
        // currentUser.saves = [{ user: "1938912839018230", plant: "12831823789123"}]
        // plants.map(plant => {
        //   if (plant.id coiciden con algun un save.plant){
        //     return {...plant, saved: true}
        //   } else return plant
        // })
      plants.map((plant) => {
          // return (
          //   if(plant.id === currentUser.saves) {

          //   }
          // )
      })
        setLoading(false);
        setPlants(plants);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    listAllPlants();
  }, [listAllPlants]);

  const handleBookmark = (plant) => {
    setIsBookmarked(!isBookmarked);
    const isPlantSaved = savedPlants.some(
      (savedPlant) => savedPlant.plant._id === plant._id
    );

    if (isPlantSaved) {
      const savedPlant = savedPlants.find(
        (savedPlant) => savedPlant.plant._id === plant._id
      );
      deleteSavePlant(savedPlant._id)
        .then((response) => {
          console.log(response.data);
          setSavedPlants(
            savedPlants.filter(
              (savedPlant) => savedPlant.plant._id !== plant._id
            )
          );
        })
        .catch((err) => console.log(err));
    }
    postSavePlant(plant._id)
      .then((save) => {
        console.log(save);
        setSavedPlants([...savedPlants, save]);
      })

      .catch((err) => console.log(err));
  };

  return (
    <div className="row gy-4 gx-4">
      <Navbar />
      <div className="allPlants">
        {loading
          ? "Loading...."
          : plants.map((plant) => {
              return <PlantCard key={plant._id} plant={plant} />;
            })}
      </div>
    </div>
  );
};

export default PlantsList;
