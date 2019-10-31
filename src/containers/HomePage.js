import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  //custom hook for form
  const useForm = callback => {
    const [values, setValues] = useState({});

    const handleSubmit = event => {
      if (event) event.preventDefault();
      callback();
    };

    const handleChange = event => {
      event.persist();
      setValues(values => ({
        ...values,
        [event.target.name]: event.target.value
      }));
    };

    return {
      handleChange,
      handleSubmit,
      values
    };
  };

  //setting the intial state  to be rendered

  const [searchReturns, setSearchReturn] = useState(null);
  const [favorites, setFavorites] = useState([]);

  //function for search

  const fetchGifs = () => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=Vg8s7OVmHNLZ5JVrhyKiuPA78vB92lA2&q=${
      values.search
    }&limit=&offset=0&rating=G&lang=en
`)
      .then(r => r.json())
      .then(r => (console.log(r), setSearchReturn(r.data)));
  };

  /// pulling out values from the custom hook for the form
  const { values, handleChange, handleSubmit } = useForm(fetchGifs);

  return (
    <div class="container">
      <input
        class="input"
        type="text"
        name="search"
        value={values.search}
        onChange={handleChange}
      />
      <button onClick={handleSubmit} class="button">
        search
      </button>
      {searchReturns
        ? searchReturns.map(gif => (
            <div>
              <img src={gif.images.original.url} />
              <button
                onClick={() =>
                  setFavorites([...favorites], gif.images.original.url)
                }
              >
                Add to favorites
              </button>
            </div>
          ))
        : null}
    </div>
  );
}
