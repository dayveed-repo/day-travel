import React from "react";
import styles from "../styles/MapWindow.module.css";
import GoogleMapReact from "google-map-react";
import { BsStarFill } from "react-icons/bs";

function MapWindow({
  setcoordinates,
  coordinates,
  setbounds,
  places,
  setchildClicked,
  placesRef,
}) {
  const handleZoneChange = (e) => {
    setcoordinates({ lat: e.center.lat, lng: e.center.lng });
    setbounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
  };

  const handleClick = (i) => {
    placesRef[i].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.MapWindow}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        onChange={handleZoneChange}
        onChildClick={(child) => setchildClicked(child)}
        options={""}
        defaultZoom={15}
        margin={[50, 50, 50, 50]}
      >
        {places.map((place, i) => {
          if (!place.name) return;
          return (
            <div
              key={i}
              onClick={() => handleClick(i)}
              className={styles.PlaceOnMap}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
            >
              <h4>{place.name}</h4>
              <img
                src={
                  place.photo
                    ? place.photo.images.large.url
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRwsMxVRAE2vY_sJueAaTUSCk-PGq3fvxbKw&usqp=CAU"
                }
                alt={place.name}
              />

              {place?.rating && (
                <div>
                  {[...Array(Number.parseInt(place?.rating))].map((star) => (
                    <BsStarFill color="orange" />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default MapWindow;
