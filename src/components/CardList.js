import React from "react";
import Card from "./Card/Card";
import "./Card/card.css";

function CardList({ characterList }) {
  return (
    <>
      <div className="cards-list">
        {characterList.length > 0 &&
          characterList.map((item) => (
            <Card
              key={item.id}
              name={item.name}
              gender={item.gender}
              species={item.species}
              status={item.status}
              image={item.image}
              location={item.location.name}
              episode={item.episode}
            />
          ))}

        {characterList.length <= 0 && <div>kayıt bulunamadı</div>}
      </div>
    </>
  );
}

export default CardList;
