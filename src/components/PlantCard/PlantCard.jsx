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
      <Link to={`/plants/${plant._id}`} style={{textDecoration:"none", 
      display:'flex', color:'green'}}>
          <div className="ImagePlantList">
            <img src={plant.image} />
          </div>
        

        <div className="TitlePlantCard">
          <h4 style={{ fontWeight: "bold", fontSize:"20px", whiteSpace:'nowrap',
          textOverflow:"ellipsis", overflow:'hidden', width:'190px'}}>{plant.commonName}</h4>
          <div className="IconsCard">
          
          {plant.watering === "Frequent" && (
            <div className="IconsPlantCard">  
            <p style={{marginRight:'70px'}}>Water:</p>
              <i className="bi bi-droplet-fill"></i>
              <i className="bi bi-droplet-fill"></i>
              <i className="bi bi-droplet-fill"></i>
            </div>
          )}

          {plant.watering === "Average" && (
            <div className="IconsPlantCard">
            <p style={{marginRight:'70px'}}>Water:</p>
              <i className="bi bi-droplet-fill"></i>
              <i className="bi bi-droplet-fill"></i>
              <i className="bi bi-droplet"></i>
            </div>
          )}

          {plant.watering === "Minimum" && (
            <div className="IconsPlantCard">
            <p style={{marginRight:'70px'}}>Water:</p>
              <i className="bi bi-droplet-fill"></i>
              <i className="bi bi-droplet"></i>
              <i className="bi bi-droplet"></i>
            </div>
          )}

          {plant.maintenance === "Low" && (
            <div className="IconsPlantCard">
            <p style={{marginRight:'34px'}}>Maintenance:</p>
              <i className="bi bi-1-circle"></i>
            </div>
          )}

          {plant.maintenance === "Moderate" && (
            <div className="IconsPlantCard">
            <p style={{marginRight:'34px'}}>Maintenance:</p>
              <i className="bi bi-2-circle"></i>
            </div>
          )}

          {plant.maintenance === "Hight" && (
            <div className="IconsPlantCard">
            <p style={{marginRight:'34px'}}>Maintenance:</p>
              <i className="bi bi-3-circle"></i>
            </div>
          )}
        </div>
        </div>
        </Link>
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
