import React, { useState } from "react";

const MovieList = () => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /** const getDataHandler = () => {
    //setIsLoading(true);
    fetch("https://swapi.dev/api/films")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data.results);
        setMovie(data.results);
      });
    //setIsLoading(false);
  }; */

  async function getDataHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/film");
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setMovie(data.results);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <div>
      <button onClick={getDataHandler}> Click Me </button>

      <section>
        {movie.length === 0 && !isLoading && !error && (
          <p>No Movie Available</p>
        )}
        {isLoading && <p> Molly Jane is on its way . . . . </p>}
        {!isLoading &&
          movie.length > 0 &&
          movie.map((xx) => {
            return <pre key={xx.episode_id}>{xx.title}</pre>;
          })}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </div>
  );
};
export default MovieList;
