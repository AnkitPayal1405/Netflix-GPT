import { useSelector } from "react-redux"
import MovieList from "./MovieList"

const GptSearchPage = () => {

  const {movieResults, movieNames} = useSelector((store) => store.gpt)
  
  if(!movieNames) return null;
  return (
    <div>
      <div className="bg-black text-white p-4 m-4 rounded-xl opacity-90">
        
        {movieNames.map((movieNames, index)=> (
          <MovieList
          key={movieNames} title={movieNames} movies={movieResults[index]}
          />
        ) )}
      </div>
    </div>
  )
}

export default GptSearchPage