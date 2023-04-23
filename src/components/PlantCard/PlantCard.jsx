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
        <Link to={`/plants/${plant._id}`}>
          <div className="ImagePlantList">
            <img src={plant.image} />
          </div>
        </Link>

        <div className="TitlePlantCard">
          <h4 style={{ fontWeight: "bold" }}>{plant.commonName}</h4>
          <img src={sun} style={{ width: "20px" }} /> <p>{plant.sunlight}</p>
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
            <i className="bi bi-droplet-fill"></i>
            <i className="bi bi-droplet-fill"></i>
            <i className="bi bi-droplet-fill"></i>
          </div>
        )}

        {plant.watering === "Average" && (
          <div className="IconsPlantCard">
            <i className="bi bi-droplet-fill"></i>
            <i className="bi bi-droplet-fill"></i>
            <i className="bi bi-droplet"></i>
          </div>
        )}

        {plant.watering === "Minimum" && (
          <div className="IconsPlantCard">
            <i className="bi bi-droplet-fill"></i>
            <i className="bi bi-droplet"></i>
            <i className="bi bi-droplet"></i>
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
              style={{
                fontSize: "20px",
                color: "#27AE60",
                borderColor: "#50FA97",
              }}
            ></i>
          ) : (
            <i
              className="bi bi-bookmark"
              style={{
                fontSize: "20px",
                color: "#27AE60",
                borderColor: "#50FA97",
              }}
            ></i>
          )}
        </button>
      </div>
    </>
  );
};

export default PlantCard;
