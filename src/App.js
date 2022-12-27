import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retyring, setRetrying]=useState(false)

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/film/");

      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      setRetrying(true)

      const data = await response.json();

      

      {
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    setRetrying(true)
  }
if(error){
  <button></button>
}
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && movies.length===0 && !error && <p>Found no movies</p>}
        {!isLoading && error && <p>{error}  <button>Stop Retrying</button></p>}
        {isLoading && <p>LOADING....</p> }
      </section>
    </React.Fragment>
  );
}

export default App;
