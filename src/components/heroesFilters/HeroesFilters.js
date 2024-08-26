import { useState, useEffect } from "react";
import { useRequests } from "../../hooks/useRequests";
import { useSelector } from "react-redux";

const HeroesFilters = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const request = useRequests();
	const elements = useSelector(state => state.filter.filters)

	useEffect(() => {
		request.fetchFilters()
	})


  const onSubmit = (element) => {
    setSelectedElement(element);
    request.fetchFilteredHeroes(element);
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
