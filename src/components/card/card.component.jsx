import React from "react"
import './card.styles.css'
// import { createClient } from 'pexels'

// console.log(process.env.NODE_ENV)
// console.log(process.env.API_KEY)

export const Card = (props) => {
  
//   // const httpGet = (theUrl) => {
//   //   let xmlHttpReq = new XMLHttpRequest();
//   //   xmlHttpReq.open("GET", theUrl, false); 
//   //   xmlHttpReq.send(null);
//   //   return xmlHttpReq.responseText;
//   // }

  // const client = createClient('563492ad6f91700001000001278c6ab6fb3f44f39ff96f5f7aaa879b');
  // const query = 'Nature';
  
  // client.photos.search({ query, per_page: 1 }).then(photos => photos.map(photo => 
  //   console.log(photo)
  // ));

  return (
  <div className="card-container">
    {/* <h1> {props.philosopher.name} </h1> */}

    <img alt="monster" src={`https://robohash.org/${props.monster.id}?set=set2&size=180x180`}/>
    <a href="https://www.pexels.com">Photos provided by Pexels</a>

    <h2> {props.monster.name} </h2>
    <p> {props.monster.email} </p>
  </div>
)}