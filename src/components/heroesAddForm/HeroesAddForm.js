// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import { useForm } from "react-hook-form";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import {
  heroesUpdating,
  heroesUpdated,
  heroesUpdatingError,
} from "../../reducers/heroSlice";
import "../../styles/index.scss";

export default function HeroesAddForm() {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
		heroesUpdating();
		data.id = v4();
		console.log(data);
    request("http://localhost:3001/heroes", "POST", JSON.stringify(data))
      .then((data) => dispatch(heroesUpdated([data])))
      .catch((error) => {
				console.log(error)
				dispatch(heroesUpdatingError())
			});
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border p-4 shadow-lg rounded"
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          className="form-control"
          {...register("name", { required: true, minLength: 2 })}
          placeholder="Как меня зовут?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          className="form-control"
          {...register("description", { required: true, minLength: 3 })}
          placeholder="Что я умею?"
          style={{ height: "130px" }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select className="form-select" {...register("element")}>
          <option>Я владею элементом...</option>
          <option value="fire">Огонь</option>
          <option value="water">Вода</option>
          <option value="wind">Ветер</option>
          <option value="earth">Земля</option>
        </select>
        <input
          type="submit"
          value="Создать"
          className="btn btn-primary form-button"
        />
      </div>
    </form>
  );
}
