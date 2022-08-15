import { Autocomplete } from "@react-google-maps/api";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "../styles/Navbar.module.css";

function Navbar({ setcoordinates }) {
  return (
    <div className={styles.Navbar}>
      <h1>Day Travel</h1>

      <p>Find the best places to chill and dine</p>

      <form className={styles.SearchBar}>
        <AiOutlineSearch />
        <input type="text" placeholder="search" />
      </form>
    </div>
  );
}

export default Navbar;
