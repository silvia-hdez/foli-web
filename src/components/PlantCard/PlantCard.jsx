import React, { useCallback, useEffect, useState } from "react";
import "./PlantCard.css";
import { Link } from "react-router-dom";
import dropFill from "../../assets/img/droplet-fill.svg";
import drop from "../../assets/img/droplet.svg";
import filteredLight from "../../assets/img/filtred-light.png";
import fullLight from "../../assets/img/full-light.png";
import partLight from "../../assets/img/part-light.png";
import sun from "../../assets/img/sun.svg";

const PlantCard = ({ plant, clickHandler, isSaved }) => {
  return (
    <>
      <div className="plantCard">
        <div className="ImagePlantList">
          <Link to={`/plants/${plant._id}`}>
            <img src={plant.image} />
          </Link>
        </div>

        <div className="TitlePlantCard">
          <h4>{plant.commonName}</h4>
          <img src={sun} style={{width:'20px'}}/> <p>{plant.sunlight}</p> 
          {/* <p>{plant.watering} </p> */}
          {/* <p>{plant.growthRate}</p> */}
        </div>


        {plant.sunlight === "Full sun" && (
          <div className="IconsPlantCard">
            <img src={fullLight} />
          </div>
        )}
        {plant.sunlight === "Part shadefull shade " && (
          <div className="IconsPlantCard">
            <img src={partLight} />
          </div>
        )}
        {plant.sunlight === "Filtered shade" && (
          <div className="IconsPlantCard">
            <img src={filteredLight} />
          </div>
        )}

        {plant.watering === "Frequent" && (
          <div className="IconsPlantCard">
            <img src={dropFill} alt="Drop fill icon" />
            <img src={dropFill} alt="Drop fill icon" />
            <img src={dropFill} alt="Drop fill icon" />
          </div>
        )}

        {plant.watering === "Average" && (
          <div className="IconsPlantCard">
            <img src={dropFill} alt="Drop fill icon" />
            <img src={dropFill} alt="Drop fill icon" />
            <img src={drop} alt="Drop fill icon" />
          </div>
        )}

        {plant.watering === "Minimum" && (
          <div className="IconsPlantCard">
            <img src={dropFill} alt="Drop fill icon" />
            <img src={drop} alt="Drop fill icon" />
            <img src={drop} alt="Drop fill icon" />
          </div>
        )}

        <button
          onClick={clickHandler}
          style={{ backgroundColor: "transparent", border: "none" }}
          id={plant._id}
          className="ButtonBookmark"
        >
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
    </>
  );
};

export default PlantCard;
