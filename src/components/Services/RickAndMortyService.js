import { useState } from "react";
import axios from "axios";

function RickAndMortyService(initial) {
  const [characterList, setCharacterList] = useState(initial);
  const [lastEpisodes, setLastEpisodes] = useState(initial);

  async function getCharacterListByUrl(url) {
    await axios
      .get(url)
      .then((response) => {
        setCharacterList(response.data.results);
      })
      .catch((error) => {
        console.log(error);
        setCharacterList([]);
      });
  }

  async function getEpisodesByIds(ids) {
    await axios
      .get("https://rickandmortyapi.com/api/episode/" + ids)
      .then((response) => {
        if (response.data !== null && !Array.isArray(response.data)) {
          setLastEpisodes([response.data]);
        } else {
          setLastEpisodes(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setLastEpisodes([]);
      });
  }

  return {
    characterList,
    lastEpisodes,
    getCharacterListByUrl,
    getEpisodesByIds,
  };
}

export default RickAndMortyService;
