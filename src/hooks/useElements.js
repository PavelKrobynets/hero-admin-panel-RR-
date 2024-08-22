// useElements.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "./http.hook";
import { filterFetch } from "../reducers/filterSlice";

const useElements = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const elements = useSelector((state) => state.filter.filters);

  useEffect(() => {
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filterFetch(data)))
      .catch((error) => console.error(error));
    // eslint-disable-next-line
  }, []);

  return elements;
};

export default useElements;
