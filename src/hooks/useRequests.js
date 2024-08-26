import { useDispatch } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { v4 } from "uuid";
import { useCallback } from "react";
import {
  heroesFiltered,
  heroesUpdating,
  heroesUpdated,
  heroesUpdatingError,
  heroDeleted
} from "../reducers/heroSlice";
import {filterFetch} from "../reducers/filterSlice"

export const useRequests = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();

  const fetchHeroes = () => {
    dispatch(heroesUpdating());
    request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesUpdated(data)))
      .catch(() => dispatch(heroesUpdatingError()));
  };

	const fetchFilters = () => {
		request("http://localhost:3001/filters")
      .then((data) => dispatch(filterFetch(data)))
      .catch((error) => console.error(error));
	}

  const fetchFilteredHeroes = (element) => {
    request("http://localhost:3001/heroes").then((data) => {
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
    request("http://localhost:3001/heroes", "POST", JSON.stringify(data))
      .then((data) => dispatch(heroesUpdated([data])))
      .catch((error) => {
        console.log(error);
        dispatch(heroesUpdatingError());
      });
  };

  const deleteHero = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, "DELETE")
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

  return { fetchHeroes, fetchFilteredHeroes, setNewHero, deleteHero, fetchFilters };
};
