import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Filters from "./Filter/Filters";
import CardList from "./CardList";
import CardDetail from "./CardDetail/CardDetail";
import RickAndMortyService from "./Services/RickAndMortyService";
import "../styles/main.css";

function RickAndMorty() {
  const { characterList, getCharacterListByUrl } = RickAndMortyService([]);

  function callbackFilter(url) {
    getCharacterListByUrl(url);
  }

  useEffect(() => {
    getCharacterListByUrl("https://rickandmortyapi.com/api/character");
  }, []);

  return (
    <>
      <h1>Rick and Morty</h1>
      <Router>
        <Filters
          baseUrl={"https://rickandmortyapi.com/api/character"}
          changeUrl={callbackFilter}
        />
        <Switch>
          <Route exact path="/">
            <CardList characterList={characterList} />
          </Route>
          <Route path="/cardDetail">
            <CardDetail />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default RickAndMorty;
