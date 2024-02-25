import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptSearchPage from './GptSearchPage'
import { BG_URL } from '../utils/Constants'

const GPTsearch = () => {
  return (
    <><div className="fixed -z-10">
    <img className='h-screen md:w-screen object-cover'
      src={BG_URL}
      alt="background"
    />
  </div>
  <div>
       
      <GptSearchBar/>
      <GptSearchPage/>
    </div></>
    
  )
}

export default GPTsearch