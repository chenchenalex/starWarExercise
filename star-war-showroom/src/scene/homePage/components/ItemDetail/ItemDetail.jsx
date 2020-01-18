import React from "react";
import styles from "./itemDetailStyles.css";
import { isEmpty } from "../../../../utitlity/helpers";

export default function ItemDetail({ personData, filmData }) {
  return (
    <div styles={styles} className="item-details">
      <h1>Detail section</h1>
      <p>Name: {personData.name}</p>
      <p>Gender: {personData.gender}</p>
      <p>List of films:</p>
      {!isEmpty(filmData) ? (
        <ul>
          {personData.films &&
            personData.films.map(film => {
              if (filmData[film]) {
                return <li key={film.episode_id}>{filmData[film].title}</li>;
              }
              return "";
            })}
        </ul>
      ) : (
        <p>
          WAIT A SEC, we are fetching movies for you! <span role="img">🎬</span>
        </p>
      )}
    </div>
  );
}
