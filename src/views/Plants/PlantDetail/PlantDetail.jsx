import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlantDetail } from "../../../services/PlantService";
import Navbar from "../../../components/misc/NavBar/NavBar";
import Header from "../../../components/misc/Header/Header";
import './PlantDetail.css'
import ScrollToTopButton from "../../../components/ScrollUp/ScrollUp";

const PlantDetail = () => {
  const [plant, setPlant] = useState(null);
  const { id } = useParams();

  useEffect(() => {

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
      <div className="DetailsPlant">
        <img src={plant.image} />
        <div className="PlantProperties">
          <p className="CommonName">{plant.commonName}</p>
          <p className="ScientidName">{plant.scientificName}</p>
          <p><b style={{fontStyle:'italic', color:'green'}}>Family:</b> {plant.family}</p>
          <p><b style={{fontStyle:'italic', color:'green'}}>Origin:</b> {plant.origin}</p>
          <p><b style={{fontStyle:'italic', color:'green'}}>Maintenance:</b> {plant.maintenance}</p>
          <p><b style={{fontStyle:'italic', color:'green'}}>Growth Rate:</b> {plant.growthRate}</p>
          <p><b style={{fontStyle:'italic', color:'green'}}>Watering:</b> {plant.watering}</p>
          <p><b style={{fontStyle:'italic', color:'green'}}>Drought Tolerant:</b> {String(plant.droughtTolerant)}</p>
          <ul><b style={{fontStyle:'italic', color:'green'}}>Sunlight:</b>
          {plant.sunlight.map((sunlight) => (
              <li key={sunlight}>{sunlight}</li>
            ))}
          </ul>
          <ul><b style={{fontStyle:'italic', color:'green'}}>Propagation:</b>
          {plant.propagation.map((propagation) => (
              <li key={propagation}>{propagation}</li>
            ))}
          </ul>
          <ul><b style={{fontStyle:'italic', color:'green'}}>Attracts:</b>
          {plant.attracts.map((attracts) => (
              <li key={attracts}>{attracts}</li>
            ))}
          </ul>
          <ul><b style={{fontStyle:'italic', color:'green'}}>Soil:</b>
          {plant.soil.map((soil) => (
              <li key={soil}>{soil}</li>
            ))}
          </ul>
          <p><b style={{fontStyle:'italic', color:'green'}}>Cycle:</b> {plant.cycle}</p>
          <p><b style={{fontStyle:'italic', color:'green'}}>Thorny:</b> {String(plant.thorny)}</p>
          <p><b style={{fontStyle:'italic', color:'green'}}>Tropical:</b> {String(plant.tropical)}</p>
          <p><b style={{fontStyle:'italic', color:'green'}}>Invasive:</b> {String(plant.invasive)}</p>
          <p><b style={{fontStyle:'italic', color:'green'}}>Indoor:</b> {String(plant.indoor)}</p>
          <p><b style={{fontStyle:'italic', color:'green'}}>Flowers:</b> {String(plant.flowers)}</p>
          <p><b style={{fontStyle:'italic', color:'green'}}>Fruits:</b> {String(plant.fruits)}</p>
          <p><b style={{fontStyle:'italic', color:'green'}}>Cuisine:</b> {String(plant.cuisine)}</p>

        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default PlantDetail;
