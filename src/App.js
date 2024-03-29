import React, { useState, useEffect } from "react";

export default function App() {
  // hook for controlled form
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
  const [showFavorites, setShowFavorites] = useState(false);
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

  /// pulling out values from the custom hook for the form...this had to be declared after the function call fetchGifs..
  const { values, handleChange, handleSubmit } = useForm(fetchGifs);

  // html return for default page

  const homePageHTML = (
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
      <button onClick={() => setShowFavorites(!showFavorites)} class="button">
        view favorites
      </button>
      {searchReturns
        ? searchReturns.map(gif => (
            <div>
              <img src={gif.images.original.url} />
              <button
                onClick={() =>
                  setFavorites([...favorites, gif.images.original.url])
                }
              >
                Add to favorites
              </button>
            </div>
          ))
        : null}
    </div>
  );

  // html return for favorites page

  const favoritesHTML = (
    <div>
      <button onClick={() => setShowFavorites(!showFavorites)} class="button">
        go back
      </button>
      {favorites.map(gif => (
        <img src={gif} />
      ))}
    </div>
  );
  console.log(favorites);

  //return for app if state is to show the favorites it will return different html

  return <div>{showFavorites ? favoritesHTML : homePageHTML}</div>;
}
