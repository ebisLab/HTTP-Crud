import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, setMovieList, setDependency }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = (e) =>{
    e.preventDefault();
    const id = match.params.id
history.push(`/update-movie/${id}`);

    console.log('Making sure its updating')
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = e =>{
    e.preventDefault();
    const id = match.params.id
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(res=> { 
      setDependency(true);

      history.push('/')
      console.log(res, 'deleted res')
    })
    .catch(err=>err)
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button className="update-button" onClick={updateMovie}>Update Movie</button>
      <button className="delete-button" onClick={deleteMovie}>Delete</button>

    </div>
  );
}

export default Movie;
