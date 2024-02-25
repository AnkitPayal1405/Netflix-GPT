import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title, movies}) => {
  return (
    <div className='p-4 '>
        <h1 className='text-2xl px-4 font-bold text-white'>{title}</h1>
        <div className='flex overflow-x-scroll py-2'>
            <div className='flex'>
                {movies?.map(movies => <MovieCard key={movies.id} posterPath={movies.poster_path}/>)}
        
            </div>
        </div>
    </div>
  )
}

export default MovieList