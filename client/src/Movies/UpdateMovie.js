import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialState = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

const UpdateMovie = () => {
  const [movie, setMovie] = useState(initialState);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res);
        //res.data
        setMovie(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = event => {
    setMovie({ ...movie, [event.target.name]: event.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log(res);
        push('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='title'>Title</label>
      <input
        id='title'
        type='text'
        name='title'
        placeholder='Enter Title'
        onChange={handleChange}
        value={movie.title}
      />
      <label htmlFor='metascore'>Metascore</label>
      <input
        id='metascore'
        type='text'
        name='metascore'
        placeholder='Enter Metascore'
        onChange={handleChange}
        value={movie.metascore}
      />
      <label htmlFor='stars'>Stars</label>
      <input
        id='stars'
        type='text'
        name='stars'
        placeholder='Enter Stars'
        onChange={handleChange}
        value={movie.stars}
      />
      <button>Update Movie</button>
    </form>
  );
};

export default UpdateMovie;
