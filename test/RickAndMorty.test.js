import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from "axios";
import { jest } from "@jest/globals";
import RickAndMortyService from "../src/components/Services/RickAndMortyService";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");
describe("RickAndMortyService", () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GetEpisodesByIds function", () => {
    it("should return episodes by given ids an array", async () => {
      axios.get.mockImplementation(() => {
        return Promise.resolve({
          data: [
            {
              air_date: "December 2, 2013",
              characters: ["https://rickandmortyapi.com/api/character/1"],
              created: "2017-11-10T12:56:33.798Z",
              episode: "S01E01",
              id: 1,
              name: "Pilot",
              url: "https://rickandmortyapi.com/api/episode/1",
            },
          ],
        });
      });

      await RickAndMortyService([]).getEpisodesByIds(1);

      expect(setState).toHaveBeenCalledWith([
        {
          air_date: "December 2, 2013",
          characters: ["https://rickandmortyapi.com/api/character/1"],
          created: "2017-11-10T12:56:33.798Z",
          episode: "S01E01",
          id: 1,
          name: "Pilot",
          url: "https://rickandmortyapi.com/api/episode/1",
        },
      ]);
    });

    it("should return episodes by given ids an object", async () => {
      axios.get.mockImplementation(() => {
        return Promise.resolve({
          data: {
            air_date: "December 2, 2013",
            characters: ["https://rickandmortyapi.com/api/character/1"],
            created: "2017-11-10T12:56:33.798Z",
            episode: "S01E01",
            id: 1,
            name: "Pilot",
            url: "https://rickandmortyapi.com/api/episode/1",
          },
        });
      });

      await RickAndMortyService([]).getEpisodesByIds(1);

      expect(setState).toHaveBeenCalledWith([
        {
          air_date: "December 2, 2013",
          characters: ["https://rickandmortyapi.com/api/character/1"],
          created: "2017-11-10T12:56:33.798Z",
          episode: "S01E01",
          id: 1,
          name: "Pilot",
          url: "https://rickandmortyapi.com/api/episode/1",
        },
      ]);
    });

    it("should return empty array state when throw error by given ids", async () => {
      axios.get.mockImplementation(() => {
        return Promise.reject("network error");
      });

      await RickAndMortyService([]).getEpisodesByIds(2);

      expect(setState).toHaveBeenCalledWith([]);
    });
  });

  describe("getCharacterListbyUrl function", () => {
    it("should return data by given url", async () => {
      axios.get.mockImplementation(() => {
        return Promise.resolve({
          data: {
            results: [
              {
                id: 1,
                name: "Rick Sanchez",
                status: "Alive",
                species: "Human",
                type: "",
                gender: "Male",
                origin: {
                  name: "Earth (C-137)",
                  url: "https://rickandmortyapi.com/api/location/1",
                },
                location: {
                  name: "Earth (Replacement Dimension)",
                  url: "https://rickandmortyapi.com/api/location/20",
                },
                image:
                  "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                episode: ["https://rickandmortyapi.com/api/episode/1"],
                url: "https://rickandmortyapi.com/api/character/1",
                created: "2017-11-04T18:48:46.250Z",
              },
            ],
          },
        });
      });

      await RickAndMortyService([]).getCharacterListByUrl(
        "https://rickandmortyapi.com/api/character"
      );

      expect(setState).toHaveBeenCalledWith([
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          origin: {
            name: "Earth (C-137)",
            url: "https://rickandmortyapi.com/api/location/1",
          },
          location: {
            name: "Earth (Replacement Dimension)",
            url: "https://rickandmortyapi.com/api/location/20",
          },
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          episode: ["https://rickandmortyapi.com/api/episode/1"],
          url: "https://rickandmortyapi.com/api/character/1",
          created: "2017-11-04T18:48:46.250Z",
        },
      ]);
    });

    it("should return throw error by given false url", async () => {
      axios.get.mockImplementation(() => {
        return Promise.reject("network error");
      });

      await RickAndMortyService([]).getCharacterListByUrl(
        "https://rickandmortyapi.com/api/character"
      );

      expect(setState).toHaveBeenCalledWith([]);
    });
  });
});
