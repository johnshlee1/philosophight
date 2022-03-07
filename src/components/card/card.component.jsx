import React from "react";
import "./card.styles.css";

export const Card = (props) => {
  return (
    <div className="card-background">
      <div className="card-container">
        <img
          className="ref"
          src={
            props.philosopher.imageUrl || "https://via.placeholder.com/400x300"
          }
          alt="Uploaded Images"
          width="200"
        />
        <h2>{props.philosopher.name}</h2>
        <div className="desc">
          <h3>Primary Weapon: {props.philosopher.weapon}</h3>
          <h3>Strength: {props.philosopher.strength} </h3>
          <h3>Weakness: {props.philosopher.weakness} </h3>
        </div>
      </div>
    </div>
  );
};
