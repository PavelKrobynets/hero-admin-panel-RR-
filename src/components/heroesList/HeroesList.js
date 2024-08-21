import { useHttp } from "../../hooks/http.hook";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import {
  heroesUpdating,
  heroesUpdated,
  heroesUpdatingError,
	heroDeleted
} from "../../reducers/heroSlice";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const heroes = useSelector((state) => state.hero.heroes);
  const heroesLoadingStatus = useSelector(
    (state) => state.hero.heroesLoadingStatus
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesUpdating());
    request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesUpdated(data)))
      .catch(() => dispatch(heroesUpdatingError()));

    // eslint-disable-next-line
  }, []);

  const deleteHero = useCallback((id) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
		.then(data => console.log(data, "DELETED"))
      .then(dispatch(heroDeleted(id)))
      .catch((error) => {
        console.log(error);
        dispatch(heroesUpdatingError());
      });
			// eslint-disable-next-line
  }, [request]);

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (!arr || arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }
    return arr.map(({ id, ...props }) => {
      return (
        <HeroesListItem deleteHero={() => deleteHero(id)} key={id} {...props} />
      );
    });
  };

  const elements = renderHeroesList(heroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
