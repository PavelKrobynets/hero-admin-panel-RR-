import { useEffect } from "react";
import { useSelector } from "react-redux";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import { useRequests } from "../../hooks/useRequests";

const HeroesList = () => {
  const heroes = useSelector((state) => state.hero.heroes);
  const heroesLoadingStatus = useSelector(
    (state) => state.hero.heroesLoadingStatus
  );
  const request = useRequests();

  useEffect(() => {
    request.fetchHeroes();
    // eslint-disable-next-line
  }, []);

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
        <HeroesListItem
          deleteHero={() => request.deleteHero(id)}
          key={id}
          {...props}
        />
      );
    });
  };

  const elements = renderHeroesList(heroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
