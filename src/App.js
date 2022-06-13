import React, { useEffect, useRef, useState } from "react";
import './App.css';
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg';

// API_KEY
const API_KEY = "53c03d4";

// API_URL
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

// axios
const axios = require("axios").default;

const App = () => {


  // searchMovies()
  /**
   * It takes a title as an argument, and then uses the axios library to make a request to the OMDb API
   * @param title - The title of the movie you want to search for.
   */
  const searchMovies = (title) => {
    axios.get(`${API_URL}s=${title}`)
      .then(res => {
        setMovies(res.data?.Search);
      })
      .catch(e => {
        console.log(e?.message);
      });
  }

  const inputRef = useRef(null);

  /* Creating a state variable called searchTitle and setting it to an empty string. */
  const [searchTitle, setTitle] = useState("");
  /* Creating a state variable called movies and setting it to an empty array. */
  const [movies, setMovies] = useState([]);


  const handleEnterKeyPressed = event => {
    if (event.key === 'Enter') {
      searchMovies(searchTitle);
    }
  }

  useEffect(() => {
    searchMovies(searchTitle);
  }, []);

  return (
    <div className="app">
      <h1>SearchMyMovie</h1>

      <div className="search">
        <input type="text" placeholder="Search (Films, Shows, etc) ..." ref={inputRef} value={searchTitle} onChange={() => { setTitle(inputRef.current.value) }} onKeyDown={handleEnterKeyPressed} />
        <img src={SearchIcon} alt="search" onClick={() => { searchMovies(searchTitle) }} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;