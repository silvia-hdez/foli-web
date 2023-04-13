import React, { useCallback, useEffect, useState } from "react";
import "./PlantCard.css";
import { Link } from "react-router-dom";


const PlantCard = ({ plant, clickHandler, isSaved }) => {
 

  return (
    <div className="plantCard">

      <img src={plant.image} />
      <p>{plant.commonName}</p>
      <Link to={`/plants/${plant._id}`}>Details</Link>

      <button onClick={clickHandler}  id={plant._id}>
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
  );
};

export default PlantCard;
