import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlantDetail } from "../../../services/PlantService";
import Navbar from "../../../components/misc/NavBar/NavBar";
import Header from "../../../components/misc/Header/Header";
import './PlantDetail.css'

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
          <p><b style={{fontStyle:'italic'}}>Family:</b> {plant.family}</p>
          <p><b style={{fontStyle:'italic'}}>Origin:</b> {plant.origin}</p>
          <p><b style={{fontStyle:'italic'}}>Maintenance:</b> {plant.maintenance}</p>
          <p><b style={{fontStyle:'italic'}}>Growth Rate:</b> {plant.growthRate}</p>
          <p><b style={{fontStyle:'italic'}}>Watering:</b> {plant.watering}</p>
          <p><b style={{fontStyle:'italic'}}>Drought Tolerant:</b> {String(plant.droughtTolerant)}</p>
          <ul><b style={{fontStyle:'italic'}}>Sunlight:</b>
          {plant.sunlight.map((sunlight) => (
              <li key={sunlight}>{sunlight}</li>
            ))}
          </ul>
          <ul><b style={{fontStyle:'italic'}}>Propagation:</b>
          {plant.propagation.map((propagation) => (
              <li key={propagation}>{propagation}</li>
            ))}
          </ul>
          <ul><b style={{fontStyle:'italic'}}>Attracts:</b>
          {plant.attracts.map((attracts) => (
              <li key={attracts}>{attracts}</li>
            ))}
          </ul>
          <ul><b style={{fontStyle:'italic'}}>Soil:</b>
          {plant.soil.map((soil) => (
              <li key={soil}>{soil}</li>
            ))}
          </ul>
          <p><b style={{fontStyle:'italic'}}>Cycle:</b> {plant.cycle}</p>
          <p><b style={{fontStyle:'italic'}}>Thorny:</b> {String(plant.thorny)}</p>
          <p><b style={{fontStyle:'italic'}}>Tropical:</b> {String(plant.tropical)}</p>
          <p><b style={{fontStyle:'italic'}}>Invasive:</b> {String(plant.invasive)}</p>
          <p><b style={{fontStyle:'italic'}}>Indoor:</b> {String(plant.indoor)}</p>
          <p><b style={{fontStyle:'italic'}}>Flowers:</b> {String(plant.flowers)}</p>
          <p><b style={{fontStyle:'italic'}}>Fruits:</b> {String(plant.fruits)}</p>
          <p><b style={{fontStyle:'italic'}}>Cuisine:</b> {String(plant.cuisine)}</p>

        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
