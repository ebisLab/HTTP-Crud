import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovieForm from "./Movies/UpdateForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [dependency, setDependency] = useState(false)

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
    setDependency(false);
  }, [dependency]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie setDependency={setDependency} addToSavedList={addToSavedList} setMovieList={setMovieList}/>
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovieForm  test="testerino" setDependency={setDependency} setMovieList={setMovieList} movieList={movieList} />
      </Route>
    </>
  );
};

export default App;
