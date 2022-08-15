import React from "react";
import { AiFillPhone, AiFillSafetyCertificate } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import styles from "../styles/Place.module.css";
import { BsStarFill } from "react-icons/bs";

function Place({ place, refProp }) {
  if (!place.name) return;

  return (
    <div ref={refProp} className={styles.PlaceCard}>
      <img
        src={
          place.photo?.images?.original?.url || place.photo?.images?.medium.url
        }
        className={styles.PlaceImg}
      />
      <h3 className={styles.PlaceTitle}>{place.name}</h3>

      {place?.rating && (
        <div className={styles.PlaceCategory}>
          <div>
            {[...Array(Number.parseInt(place?.rating))].map((star) => (
              <BsStarFill color="orange" />
            ))}
          </div>

          <p>out of {place.num_reviews} reviews</p>
        </div>
      )}

      <div className={styles.PlaceCategory}>
        <h5>Price</h5>
        <p>{place.price || place.price_level}</p>
      </div>

      <div className={styles.PlaceCategory}>
        <h5>Ranking</h5>
        <p>{place.ranking}</p>
      </div>

      <div>
        {place.awards?.map((award) => {
          return (
            <div className={styles.PlaceCategory}>
              <AiFillSafetyCertificate className={styles.Icon} />
              <p>
                {award.award_type} {award.year}
              </p>
            </div>
          );
        })}
      </div>

      <div className={styles.CuisineContainer}>
        {place?.cuisine?.map((cuisine) => {
          return <p className={styles.Cuisine}>{cuisine.name}</p>;
        })}
      </div>

      <div className={styles.PlaceCategory}>
        <MdLocationOn className={styles.Icon} />
        <p>{place?.address}</p>
      </div>

      <div className={styles.PlaceCategory}>
        <AiFillPhone className={styles.Icon} />
        <p>{place?.phone}</p>
      </div>

      <div className={styles.PlaceBtns}>
        <a
          href={`${place.web_url}`}
          target="_blank"
          rel="noreferrer"
          className={styles.Btn}
        >
          Travel Advisor
        </a>
        <a
          href={`${place.website}`}
          target="_blank"
          rel="noreferrer"
          className={styles.Link}
        >
          Website
        </a>
      </div>
    </div>
  );
}

export default Place;
