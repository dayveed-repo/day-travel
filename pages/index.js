import Head from "next/head";
import { createRef, useEffect, useState } from "react";
import { getListBoundaryOptions, getApiUrl } from "../api";
import MapWindow from "../components/MapWindow";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home({ data }) {
  const [coordinates, setcoordinates] = useState({ lat: null, lng: null });
  const [bounds, setbounds] = useState(null);
  const [places, setplaces] = useState([]);
  const [childclicked, setchildclicked] = useState(null);
  const [placeRefs, setplaceRefs] = useState([]);

  const [type, settype] = useState("restaurants");
  const [rating, setrating] = useState(0);

  const [filtered, setfiltered] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setcoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!bounds) return;
      const res = await axios.get(
        getApiUrl(type),
        getListBoundaryOptions(bounds.ne, bounds.sw)
      );

      if (res.data.data && res.data.data.length) {
        setplaces(res.data.data);
      } else {
        setplaces(["No Result Found"]);
      }

      setrating("0");
    };

    fetchPlaces();
  }, [coordinates, bounds, type]);

  useEffect(() => {
    if (!places.length) return;
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => placeRefs[i] || createRef());
    setplaceRefs(refs);
  }, [places]);

  useEffect(() => {
    setfiltered(
      places.filter((place) => Number(place?.rating) >= Number(rating))
    );
  }, [rating]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Day Travel</title>
        <meta name="description" content="No 1 travel advisor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar setcoordinates={setcoordinates} />

      <main className={styles.main}>
        <Sidebar
          places={filtered.length ? filtered : places}
          childclicked={childclicked}
          placeRefs={placeRefs}
          type={type}
          settype={settype}
          rating={rating}
          setrating={setrating}
        />

        {!coordinates.lat ? (
          <h4>Loading maps ...</h4>
        ) : (
          <MapWindow
            places={filtered.length ? filtered : places}
            coordinates={coordinates}
            setcoordinates={setcoordinates}
            setbounds={setbounds}
            placesRef={placeRefs}
            setchildClicked={setchildclicked}
          />
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API

  const res = await axios.get(
    getApiUrl("restaurants"),
    getListBoundaryOptions()
  );
  const data = await res.data;

  // Pass data to the page via props
  return { props: { data: data.data } };
}
