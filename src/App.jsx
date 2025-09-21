import { useState, useRef, useEffect, useCallback, use, useTransition } from "react";
import "./App.css";
import { useDebounce } from 'react-use'
import { client } from "./lib/appwrite";
import { AppwriteException } from "appwrite";
import AppwriteSvg from "../public/appwrite.svg";
import ReactSvg from "../public/react.svg";
import Search from "./componenets/search";
import Spinner from "./componenets/spinner";
import MovieCard from "./componenets/movieCard";


const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
function App() {

  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [movieList, setMovieList] = useState([])
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async(query = '') => {
    setIsLoading(true)
    setErrorMessage('')
    try{
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const res = await fetch(endpoint, API_OPTIONS)
      if(!res.ok){
        throw new Error('failed to fetch movies')
      }
      const data = await res.json()
      if(data.Response === 'False'){
        setErrorMessage(data.Error || 'failed to fetch movies')
        setMovieList([])
        return
      }
      
      setMovieList(data.results || [])
    }catch(e){
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

    useEffect(() => {
      fetchMovies(debouncedSearchTerm)
    }, [debouncedSearchTerm])

  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="./hero-img.svg" alt="" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without The Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <div className="all-movies">
          <h2>All Movies</h2>
          {/* here the brackets after the ternary operat */}
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {/* the brackets after the map function are not curly braces and mean a direct return statement */}
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              )
                
              )}
            </ul>
          )
        }

        </div>
      </div>
    </main>
  )
}

export default App
