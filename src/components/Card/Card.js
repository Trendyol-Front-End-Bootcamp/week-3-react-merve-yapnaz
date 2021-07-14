import React from "react";
import { Link } from "react-router-dom";

function Card({ name, gender, species, status, image, location, episode }) {
  return (
    <Link
      to={{
        pathname: "/cardDetail",
        state: {
          name: name,
          gender: gender,
          species: species,
          status: status,
          image: image,
          location: location,
          episode: episode,
        },
      }}
    >
      <div className="card">
        <div className="card_image">
          <img src={image} />
          <div className="card_title title-white">
            <p>{name}</p>
          </div>
          <div className="card_detail title-white">
            <ul>
              <li>
                <strong>Gender:</strong> {gender}
              </li>
              <li>
                <strong>Species:</strong> {species}
              </li>
              <li>
                <strong>Status:</strong> {status}
              </li>
              <li>
                <strong>Location:</strong> {location}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
