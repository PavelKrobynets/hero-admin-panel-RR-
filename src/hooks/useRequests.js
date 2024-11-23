import { useDispatch } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { v4 } from "uuid";
import { useCallback } from "react";
import {
  heroesFiltered,
  heroesUpdating,
  heroesUpdated,
  heroesUpdatingError,
  heroDeleted,
} from "../reducers/heroSlice";
import { filterFetch } from "../reducers/filterSlice";

export const useRequests = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();

  const fetchHeroes = () => {
    dispatch(heroesUpdating());
    request("/heroes.json")
      .then((data) => dispatch(heroesUpdated(data)))
      .catch(() => dispatch(heroesUpdatingError()));
  };

  const fetchFilters = () => {
    request("/heroes.json")
      .then((data) => dispatch(filterFetch(data.filters)))
      .catch((error) => console.error(error));
  };

  const fetchFilteredHeroes = (element) => {
    request("/heroes.json").then((data) => {
      const filteredHeroesData =
        element === "powerless"
          ? data
          : data.filter((hero) => hero.element === element);
      dispatch(heroesFiltered(filteredHeroesData));
    });
  };

  const setNewHero = (data) => {
    dispatch(heroesUpdating());
    data.id = v4();
    request("/heroes.json", "POST", JSON.stringify(data))
      .then((data) => dispatch(heroesUpdated([data])))
      .catch((error) => {
        console.log(error);
        dispatch(heroesUpdatingError());
      });
  };

  const deleteHero = useCallback(
    (id) => {
      request(`/heroes.json/${id}`, "DELETE")
        .then((data) => console.log(data, "DELETED"))
        .then(dispatch(heroDeleted(id)))
        .catch((error) => {
          console.log(error);
          dispatch(heroesUpdatingError());
        });
    },
    // eslint-disable-next-line
    [request]
  );

  return {
    fetchHeroes,
    fetchFilteredHeroes,
    setNewHero,
    deleteHero,
    fetchFilters,
  };
};
