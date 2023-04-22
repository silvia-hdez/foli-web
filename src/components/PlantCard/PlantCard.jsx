import React, { useCallback, useEffect, useState } from "react";
import "./PlantCard.css";
import { Link } from "react-router-dom";
import dropFill from '../../assets/img/droplet-fill.svg'
import drop from '../../assets/img/droplet.svg'

const PlantCard = ({ plant, clickHandler, isSaved }) => {

  return (
    <>
      
        <div className="plantCard">
        <Link to={`/plants/${plant._id}`}>
          <img src={plant.image} /> </Link>
          <div className="ContentCard">
            <div className="TitlePlantCard">
              <p>{plant.commonName}</p>
              {/* <p>{plant.sunlight}</p>
              <p>{plant.watering}</p>
              <p>{plant.growthRate}</p> */}
            </div>
          </div> 
         
          <button onClick={clickHandler} style={{backgroundColor:'transparent', border:'none'}}
          id={plant._id} className="ButtonBookmark">
                {isSaved ? (
                  <i
                    className="bi bi-bookmark-fill"
                    style={{ fontSize: "20px", color: "rgb(109, 101, 101)"}}
                  ></i>
                ) : (
                  <i
                    className="bi bi-bookmark"
                    style={{ fontSize: "20px", color: "rgb(109, 101, 101)" }}
                  ></i>
                )}
          </button>
            
          
          
        </div>
      
    </>
  );
};

export default PlantCard;
