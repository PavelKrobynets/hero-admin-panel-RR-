// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import useElements from "../../hooks/useElements";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { heroesFiltered } from "../../reducers/heroSlice";
import { useHttp } from "../../hooks/http.hook";

const HeroesFilters = () => {
  const dispatch = useDispatch();
  const elements = useElements();
  const { request } = useHttp();
  const [selectedElement, setSelectedElement] = useState(null);

  const onSubmit = (element) => {
    setSelectedElement(element);
    request("http://localhost:3001/heroes").then((data) => {
      const filteredHeroesData =
        element === "powerless"
          ? data
          : data.filter((hero) => hero.element === element);
      dispatch(heroesFiltered(filteredHeroesData));
    });
  };
  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {elements.map((element) => (
            <button
              key={element.name}
              className={`btn btn-${element.styles} ${
                element.name === selectedElement ? "active" : ""
              }`}
              onClick={() => onSubmit(element.name)}
            >
              {element.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
