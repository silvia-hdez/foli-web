import React, { useCallback, useEffect, useState } from "react";
import "./PlantCard.css";
import { Link } from "react-router-dom";

const PlantCard = ({ plant, clickHandler, isSaved }) => {
  return (
    <>
      
        <div className="plantCard">
        <Link to={`/plants/${plant._id}`}>
          <img src={plant.image} />
          <div style={{backgroundColor:'lightgrey', width:'150px', padding:'8px'}}>
            <div className="TitlePlantCard">
              <p>{plant.commonName}</p>

              <button onClick={clickHandler} id={plant._id}>
                {isSaved ? (
                  <i
                    className="bi bi-bookmark-fill"
                    style={{ fontSize: "20px", color: "rgb(109, 101, 101)" }}
                  ></i>
                ) : (
                  <i
                    className="bi bi-bookmark"
                    style={{ fontSize: "20px", color: "rgb(109, 101, 101)" }}
                  ></i>
                )}
              </button>
            </div>
          </div>
          </Link>
        </div>
      
    </>
  );
};

export default PlantCard;
