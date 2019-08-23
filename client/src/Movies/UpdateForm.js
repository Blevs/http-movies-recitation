import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateForm = (props) => {
  console.log(props);
  const [movie, setMovie] = useState(props.movie);

  useEffect(() => {
    setMovie(props.movie);
  }, [props.movie]);

  const handleChange = e => setMovie({...movie, [e.target.name]: e.target.value});

  const handleStar = index => e => {
    setMovie({...movie, stars: movie.stars.map((star, starIndex) => {
      return starIndex === index ? e.target.value : star;
    })});
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        props.updateMovie(res.data);
        // props.getMovies();
        props.history.push('/');
      })
      .catch(err => console.log(err.response));
  };

  const addStar = event => {
    event.preventDefault();
    setMovie({...movie, stars: [...movie.stars, ""]});
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text"
             name="title"
             placeholder="title"
             value={movie.title}
             onChange={handleChange} />
      <input type="text"
             name="director"
             placeholder="director"
             value={movie.director}
             onChange={handleChange} />
      <input type="text"
             name="metascore"
             placeholder="metascore"
             value={movie.metascore}
             onChange={handleChange} />
      {movie.stars.map((starName, index) => {
        return <input type="text"
                      placeholder="star"
                      value={starName}
                      key={index}
                      onChange={handleStar(index)} />;
      })}
      <button onClick={addStar}>Add Star</button>
      <button type="submit">Update Movie</button>
    </form>
  );
};

export default UpdateForm;
