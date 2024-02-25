import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from    "../utils/languageConstant"
import openai from '../utils/openAI'
import Error from './Error'
import { API_OPTIONS } from '../utils/Constants'
import { addGptMovieResult } from '../utils/gptSlice'

const GptSearchBar = () => {
  const searchText = useRef(null)
  const dispatch = useDispatch()

    const langKey = useSelector(store=> store.config.lang)

    const searchMovieTMDB = async(movie)=>{
      const data = await  fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1', API_OPTIONS)
      const json = await data.json();

      return json.results;

    }

    const handleGptSearchClick = async()=>{

      const gptQuery = "Act as a movie recommendation system and suggest some movies for the query :" + searchText.current.value +"only give me the name of 10 movies, comma separated like the example result given ahead. Example result: Kbhi Khushi Kbhi Gum, Dhmaal, Don, Golmaal, Mohbattien, Fukrey, Jokes, Jung, 3 idiots, Carry on jatta.   "

      const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });

      if(!gptResults.choices){
        <Error/>
      }

      const gptMovies = gptResults?.choices[0]?.message?.content.split(",")
      // console.log(gptMovies)

      const promiseArray = gptMovies.map((movie)=> searchMovieTMDB(movie))

      const tmdbResults = await Promise.all(promiseArray)

      // console.log(tmdbResults)

      

      dispatch(addGptMovieResult({movieNames:gptMovies , movieResults:tmdbResults}))

    }

  return (
    <div className='md:pt-[10%] sm:pt-[20%] pt-[33%] flex justify-center'>
        <form className='md:w-1/2  bg-black grid grid-cols-12 rounded-lg' onSubmit={(e)=> e.preventDefault()}>
            <input ref={searchText} type='text' className='p-2 md:p-4 sm:p-3 m-4 col-span-9 rounded-lg' placeholder={lang[langKey].gptSearchPlaceholder}/>
            <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar