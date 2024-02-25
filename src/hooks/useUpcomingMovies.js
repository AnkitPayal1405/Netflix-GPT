
import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUpcomingMovies } from '../utils/movieSlice'

const useUpcomingMovies = () => {
    const dispatch = useDispatch()

    const upcomingMovies = useSelector(store => store.movies.upcomingMovies)

    const nowPlayingAPI = async()=>{
      const data = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2", API_OPTIONS)
      const json = await data.json()
    
      dispatch(addUpcomingMovies(json.results))
    }
  
    useEffect(()=>{
      !upcomingMovies && nowPlayingAPI()
    },[])

}

export default useUpcomingMovies