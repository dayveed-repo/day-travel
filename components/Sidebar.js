import React, { createRef, useEffect, useState } from "react";
import styles from "../styles/Sidebar.module.css";
import Place from "./Place";
import SelectInput from "./SelectInput";

function Sidebar({
  places,
  childclicked,
  placeRefs,
  type,
  settype,
  rating,
  setrating,
}) {
  return (
    <div className={styles.Sidebar}>
      <h3>Restaurants, Hotels & attractions around You</h3>

      <div className={styles.SidebarFilter}>
        <SelectInput title={"Type"} changeSelect={settype}>
          <h4>Restaurants</h4>
          <h4>Hotels</h4>
          <h4>Attractions</h4>
        </SelectInput>

        <SelectInput title={"Rating"} changeSelect={setrating}>
          <h4>All</h4>
          <h4>5.0</h4>
          <h4>4.0</h4>
          <h4>3.0</h4>
          <h4>2.0</h4>
        </SelectInput>
      </div>

      <div className={styles.Places}>
        {places[0] === "No Result Found" ? (
          <h3 className={styles.NoPlaceText}>
            No place was found for this location
          </h3>
        ) : (
          places.map((item, i) => {
            return (
              <Place
                key={i}
                place={item}
                selected={Number(childclicked) === i}
                refProp={placeRefs[i]}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Sidebar;
