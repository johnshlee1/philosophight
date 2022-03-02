import React, { useEffect, useRef, useState, useCallback } from "react";
import "./card.styles.css";

export const Card = (props) => {
  const pexelsUrl =
    "https://api.pexels.com/v1/search?query=thinking?per_page=15";
  const pexelsRequestOptions = useRef({
    method: "GET",
    headers: {
      Authorization: "563492ad6f91700001000001278c6ab6fb3f44f39ff96f5f7aaa879b",
    },
  });

  const [photos, setPhotos] = useState([]);

  // pexelsRequestOptions.current = {};

  useEffect(() => {
    fetch(pexelsUrl, pexelsRequestOptions.current)
      .then((response) => response.json())
      .then((json) => setPhotos(json.photos));
  }, []);

  const logPhotos = useCallback(() => {
    console.log(photos);
  }, [photos]);

  useEffect(() => {
    logPhotos();
  }, [logPhotos]);

  // pexelsRequestOptions.current = {}; // unlike state, you can change the value of useRef().current manually at any point in the code without using a specific method like setRef()

  // console.log(httpGet(pexelsUrl, pexelsRequestOptions))

  return (
    <div>
      {/* <h1> {props.philosopher.name} </h1> */}
      {photos.map((photo) => (
        <div className="card-container">
          <img key={photo.id} alt="monster" src={photo.src.small} />
          <h2> {props.monster.name} </h2>
        </div>
      ))}
      {/* <img alt="monster" src={`https://robohash.org/${props.monster.id}?set=set2&size=180x180`}/>
    <img alt="monster" src={`https://api.pexels.com/v1/photos/:${pexelsPhotoId()}?src.small`}/> */}
    </div>
  );
};
