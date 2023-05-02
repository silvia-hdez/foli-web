import React, { useCallback, useContext, useEffect, useState } from "react";
import { getAllPlants } from "../../../services/PlantService";
import Navbar from "../../../components/misc/NavBar/NavBar";
import PlantCard from "../../../components/PlantCard/PlantCard";
import "./PlantsList.css";
import {
  deleteSavePlant,
  getSavedPlants,
  postSavePlant,
} from "../../../services/SaveService";
import AuthContext from "../../../contexts/AuthContext";
import "./PlantsList.css";
import Header from "../../../components/misc/Header/Header";

const PlantsList = ({ all }) => {
  const [initialize, setInitialize] = useState(false);
  const [plants, setPlants] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedPlants, setSavedPlants] = useState([]);
  const [watering, setWatering] = useState({
    average: true,
    minimum: true,
    frequent: true,
  });
  const [growthRate, setGrowthRate] = useState({
    low: true,
    moderate: true,
    high: true,
  });
  const [maintenance, setMaintenance] = useState({
    low: true,
    moderate: true,
    high: true,
  });
  const [sunlight, setSunlight] = useState({
    full: true,
    partial: true,
    filtered: true,
  });
  const [plantsCopy, setPlantsCopy] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFilters, setShowFilters] = useState(false)

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // Only initialize once.
    if (!initialize) {
      getSavedPlants(currentUser._id)
        .then((savedPlants) => {
          setSavedPlants(savedPlants);

          if (!all) {
            const plants = savedPlants.map((savedPlant) => {
              return { ...savedPlant.plant, saved: true };
            });
            setLoading(false);
            setPlants(plants);
            setPlantsCopy(
              plants.map((a) => {
                return { ...a };
              })
            );
            setInitialize(true);
          } else {
            getAllPlants()
              .then((allPlants) => {
                const plants = allPlants.map((plant) => {
                  const isPlantSaved = savedPlants.some(
                    (savedPlant) => savedPlant.plant._id === plant._id
                  );
                  return { ...plant, saved: isPlantSaved };
                });
                setLoading(false);
                setPlants(plants);
                setPlantsCopy(
                  plants.map((a) => {
                    return { ...a };
                  })
                );
                setInitialize(true);
              })
              .catch((err) => console.error(err));
          }
        })
        .catch((err) => console.error(err));
    }
  }, [plants, watering]);

  const handleBookmark = (plant) => {
    const plantSavedList = savedPlants.filter((x) => x.plant._id == plant._id);

    if (plantSavedList.length > 0) {  // The plant is currently saved.
      deleteSavePlant(plantSavedList[0]._id)
        .then(() => {
          setSavedPlants(
            savedPlants.filter(
              (savedPlant) => savedPlant.plant._id !== plant._id
            )
          );
          setPlants(
            plants.map((p) => {
              if (p._id === plant._id) {
                return { ...p, saved: false };
              }
              return p;
            })
          );
          setPlantsCopy(
            plantsCopy.map((x) =>
              x._id === plant._id ? { ...x, saved: false } : x
            )
          );

          if (!all) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    } else {
      postSavePlant(plant._id)
        .then((newSavedPlant) => {
          newSavedPlant["plant"] = plant;
          savedPlants.push(newSavedPlant);
          setSavedPlants(savedPlants);

          setPlants(
            plants.map((p) => {
              if (p._id === plant._id) {
                return { ...p, saved: true };
              }
              return p;
            })
          );
          setPlantsCopy(
            plantsCopy.map((x) =>
              x._id === plant._id ? { ...x, saved: true } : x
            )
          );
        })
        .catch((err) => console.log(err));
    }
  };

  function getSunlightValue(x) {
    let sunlightValue = ''
    x = x.join().toLowerCase()
    if (x.includes('filter')) {
      sunlightValue = 'filtered'
    } else if (x.includes('partial')) {
      sunlightValue = 'partial'
    } else {
      sunlightValue = 'full'
    }
    return sunlightValue
  }

  const handleCheckBox = (e) => {
    const [filterName, filterValue] = e.target.id.split("-");
    const checked = e.target.checked;

    if (filterName === "watering") {
      watering[filterValue] = checked;
      setWatering(Object.assign({}, watering));
    } else if (filterName === "growthRate") {
      growthRate[filterValue] = checked;
      setGrowthRate(Object.assign({}, growthRate));
    } else if (filterName === "maintenance") {
      maintenance[filterValue] = checked;
      setMaintenance(Object.assign({}, maintenance));
    } else if (filterName === "sunlight") {
      sunlight[filterValue] = checked;
      setSunlight(Object.assign({}, sunlight));
    }

    const filteredPlants = plantsCopy.filter(
      (plant) =>
        plant["watering"] && watering[plant["watering"].toLowerCase()] === true &&
        plant["growthRate"] && growthRate[plant["growthRate"].toLowerCase()] === true &&
        plant["maintenance"] && maintenance[plant["maintenance"].toLowerCase()] === true &&
        plant["sunlight"] && sunlight[getSunlightValue(plant["sunlight"])] === true
    );
    setPlants(filteredPlants);
  };

  const handleSort = () => {
    const sortedPlants = plantsCopy.sort((a, b) => {
      if (a.commonName.toLowerCase() < b.commonName.toLowerCase()) {
        return sortOrder === "asc" ? -1 : 1;
      } else if (a.commonName > b.commonName) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    setPlants(sortedPlants);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleShowFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="PlantsList">
    {all && <Navbar />}
      {all && (
        <>
          <Header />
          <div id="divFiltersPlants" style={{display:'flex', width:'90%'}}>
          <button onClick={handleShowFilters} className="BottonFilterPlants">Filters {showFilters ? "▲" : "▼"}</button>
          </div>
          <div className="PlantsFilter" style={{ display: showFilters ? 'block' : 'none' }}>
            <div>
              <p style={{fontWeight:'bold', fontSize:'16px'}}>Watering: </p>

              <label style={{marginRight:'4px', marginBottom:'8px'}}>Average</label>
              <input className="InputStyle"
                id="watering-average"
                checked={watering["average"]}
                type="checkbox"
                onChange={(e) => handleCheckBox(e)}
              />
              <label style={{marginRight:'4px'}}>Frequent</label>
              <input className="InputStyle"  
                id="watering-frequent"
                checked={watering["frequent"]}
                type="checkbox"
                onChange={(e) => handleCheckBox(e)}
              />
              <label style={{marginRight:'4px'}}>Minimum</label>
              <input className="InputStyle"
                id="watering-minimum"
                checked={watering["minimum"]}
                type="checkbox"
                onChange={(e) => handleCheckBox(e)}
              />
            </div>

            <div>
              <p style={{fontWeight:'bold', fontSize:'16px'}}>Growth: </p>

              <label style={{marginRight:'4px', marginBottom:'8px'}}>Low</label>
              <input className="InputStyle"
                id="growthRate-low"
                checked={growthRate["low"]}
                type="checkbox"
                onChange={(e) => handleCheckBox(e)}
              />
              <label style={{marginRight:'4px'}}>Moderate</label>
              <input className="InputStyle"
                id="growthRate-moderate"
                checked={growthRate["moderate"]}
                type="checkbox"
                onChange={(e) => handleCheckBox(e)}
              />
              <label style={{marginRight:'4px'}}>Hight</label>
              <input className="InputStyle"
                id="growthRate-high"
                checked={growthRate["high"]}
                type="checkbox"
                onChange={(e) => handleCheckBox(e)}
              />
            </div>

            <div>
              <p style={{fontWeight:'bold', fontSize:'16px'}}>Maintenance: </p>

              <label style={{marginRight:'4px', marginBottom:'8px'}}>Low</label>
              <input className="InputStyle"
                id="maintenance-low"
                checked={maintenance["low"]}
                type="checkbox"
                onChange={(e) => handleCheckBox(e)}
              />
              <label style={{marginRight:'4px'}}>Moderate</label>
              <input className="InputStyle"
                id="maintenance-moderate"
                checked={maintenance["moderate"]}
                type="checkbox"
                onChange={(e) => handleCheckBox(e)}
              />
              <label style={{marginRight:'4px'}}>Hight</label>
              <input className="InputStyle"
                id="maintenance-high"
                checked={maintenance["high"]}
                type="checkbox"
                onChange={(e) => handleCheckBox(e)}
              />
            </div>


            <div>
              <p style={{fontWeight:'bold', fontSize:'16px'}}>Sun light: </p>

              <label style={{marginRight:'4px', marginBottom:'8px'}}>Full</label>
              <input className="InputStyle"
                id="sunlight-full"
                checked={sunlight["full"]}
                type="checkbox"
                onChange={(e) => handleCheckBox(e)}
              />
              <label style={{marginRight:'4px'}}>Partial</label>
              <input className="InputStyle"
                id="sunlight-partial"
                checked={sunlight["partial"]}
                type="checkbox"
                onChange={(e) => handleCheckBox(e)}
              />
              <label style={{marginRight:'4px'}}>Filtered</label>
              <input className="InputStyle"
                id="sunlight-filtered"
                checked={sunlight["filtered"]}
                type="checkbox"
                onChange={(e) => handleCheckBox(e)}
              />
            </div>

            <button
              style={{ width: "53px", position: "absolute", 
              right: "8px", top: '8px', backgroundColor:'#27AE60',
              borderRadius:'8px', border:'1px solid #50FA97', color:'white'}}
              onClick={() => handleSort("name")}
            >
              {sortOrder === "asc" ? "abc ↑" : "abc ↓"}
            </button>
          </div>
        </>
      )}

      <div className="allPlants">
        {loading
          ? "Loading...."
          : plants.map((plant) => {
              return (
                <PlantCard
                  key={plant._id}
                  plant={plant}
                  clickHandler={() => handleBookmark(plant)}
                  isSaved={plant.saved}
                />
              );
            })}
      </div>
      
    </div>
  );
};

export default PlantsList;
