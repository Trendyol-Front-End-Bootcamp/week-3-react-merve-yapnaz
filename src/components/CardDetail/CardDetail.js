import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RickAndMortyService from "../Services/RickAndMortyService";
import "./cardDetail.css";

function CardDetail() {
  const { lastEpisodes, getEpisodesByIds } = RickAndMortyService([]);
  const [character, setCharacter] = useState([]);
  let props = useLocation();

  useEffect(() => {
    setCharacter(props.state);
  }, []);

  useEffect(() => {
    if (character.episode != undefined) {
      let episodes = character.episode.slice(0, 5).map(function (v, i, a) {
        return v.split("/").pop();
      });

      getEpisodesByIds(episodes.join(","));
    }
  }, [character]);

  return (
    <div>
      <Link to="/">
        <div className="back-button">
          <div className="arrow-wrap">
            <span className="arrow-part-1"></span>
            <span className="arrow-part-2"></span>
            <span className="arrow-part-3"></span>
          </div>
        </div>
      </Link>
      <div className="profile-content">
        <div className="profile-sub-content">
          <div className="profile-content-border">
            <h1>{character.name}</h1>
            <hr />
            <img src={character.image} />
            <ul>
              <li>
                <strong>Gender:</strong>
                {character.gender}
              </li>
              <li>
                <strong>Species:</strong>
                {character.species}
              </li>
              <li>
                <strong>Status:</strong>
                {character.status}
              </li>
              <li>
                <strong>Location:</strong>
                {character.location}
              </li>
              <li>
                <strong>Last Episodes:</strong>
                {lastEpisodes != undefined &&
                  lastEpisodes.length > 0 &&
                  lastEpisodes.map((item) => (
                    <ol key={item.id}>{item.name}</ol>
                  ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
