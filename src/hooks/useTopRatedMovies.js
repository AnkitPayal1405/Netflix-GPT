import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  addTopRatedMovies } from "../utils/movieSlice"
import { API_OPTIONS } from "../utils/Constants"


const useTopRatedMovies = () => {
  

    
    const dispatch = useDispatch()

    const topRatedMovies = useSelector(store => store.movies.topRatedMovies)

    const nowPlayingAPI = async()=>{
      const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2", API_OPTIONS)
      const json = await data.json()
    
      dispatch(addTopRatedMovies(json.results))
    }
  
    useEffect(()=>{
      !topRatedMovies && nowPlayingAPI()
    },[])


}

export default useTopRatedMovies