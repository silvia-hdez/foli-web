import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlantDetail } from "../../../services/PlantService";
import Navbar from "../../../components/misc/NavBar/NavBar";
import Header from "../../../components/misc/Header/Header";

const PlantDetail = () => {
  const [plant, setPlant] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    console.log(plant);
    getPlantDetail(id)
      .then((plant) => setPlant(plant))
      .catch((err) => console.log(err));
  }, []);

  if (!plant) {
    return <p> ... fetching plant</p>;
  }
  return (
    <div className="PlantDetail">
     <Header />
      <Navbar />
      <div>
        <img src={plant.image} />
        <p>Nombre: {plant.commonName}</p>
        <p>Cuidado: {plant.maintenance}</p>
        <p>Riego: {plant.watering}</p>
        <ul>Luz:
        {plant.sunlight.map((sunlight) => (
            <li key={sunlight}>{sunlight}</li>
          ))}
        </ul>
        <ul>Propagación:
        {plant.propagation.map((sunlight) => (
            <li key={sunlight}>{sunlight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlantDetail;
