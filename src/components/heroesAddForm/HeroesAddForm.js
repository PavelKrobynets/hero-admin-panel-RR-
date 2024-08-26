import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useRequests } from "../../hooks/useRequests";
import "../../styles/index.scss";

export default function HeroesAddForm() {
  const { register, handleSubmit } = useForm();
  const elements = useSelector(state => state.filter.filters)
	const request = useRequests();

  const onSubmit = (data) => {
		request.setNewHero(data)
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
          {elements?.map((element) => {
            return (
              <option key={element.name} value={element.name}>
                {element.name}
              </option>
            );
          })}
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
