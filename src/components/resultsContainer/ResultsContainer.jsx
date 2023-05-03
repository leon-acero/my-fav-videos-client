import "./resultsContainer.css"
import React from 'react'
import VideoSearch from '../videoSearch/VideoSearch'
import Sidebar from '../sidebar/Sidebar'


const ResultsContainer = () => {
  return (
    <div className='resultsContainer'>
        <VideoSearch />
        <Sidebar />
    </div>
  )
}

export default ResultsContainer