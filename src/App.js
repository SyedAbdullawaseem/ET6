// import React, { useCallback, useEffect, useState } from "react";

// import MoviesList from "./components/MoviesList";
// import "./App.css";

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [retyring, setRetrying]=useState(false)

//   useEffect(()=>{
//     fetchMoviesHandler();
//   },[fetchMoviesHandler])

//   const fetchMoviesHandler=useCallback(async) {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("https://swapi.dev/api/film/");

//       if (!response.ok) {
//         throw new Error("Something went wrong ....Retrying");
//       }
//       setRetrying(true)

//       const data = await response.json();

      

//       {
//         const transformedMovies = data.results.map((movieData) => {
//           return {
//             id: movieData.episode_id,
//             title: movieData.title,
//             openingText: movieData.opening_crawl,
//             releaseDate: movieData.release_date,
//           };
//         });
//         setMovies(transformedMovies);
//         setIsLoading(false);
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//     setIsLoading(false);
//     setRetrying(true)
//   }

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         {!isLoading && <MoviesList movies={movies} />}
//         {!isLoading && movies.length===0 && !error && <p>Found no movies</p>}
//         {!isLoading && error && <p>{error}  <button>Stop Retrying</button></p>}
//         {isLoading && <p>LOADING....</p> }
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;

import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enteredValue, setEnteredValue]=useState('')

  const NewMovieObj=event=>{
    setEnteredValue(event.target.value)
    
  }

  const formSubmissisnHandler=event=>{
    event.preventDefault()
    console.log(enteredValue)
  }

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
 


  return (
    <React.Fragment>
      <section>
        <form onSubmit={formSubmissisnHandler}>
          <label htmlFor='Title'>Title</label><br></br><br></br>
          <input type='text' onChange={NewMovieObj}></input><br></br><br></br>
          <label htmlFor='Opening Text'>Opening Text</label><br></br><br></br>
          <input type='text'></input><br></br><br></br>
          <label htmlFor='Release date'>Release date</label><br></br><br></br>
          <input type='date'></input><br></br><br></br>
          <button>Add movies</button>
        </form>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content} {!isLoading && error && <p> <button>Stop Retrying</button></p>}</section>
    </React.Fragment>
  );
}

export default App;
