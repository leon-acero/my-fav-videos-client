import React, { useContext, useState } from 'react'
import "./videoSearch.css"
import TagsInput from "../tagsInput/TagsInput"
import axios from '../../utils/axios';

import VideoPlayer from '../videoPlayer/VideoPlayer';

/****************************    Context API    *****************************/
import { stateContext } from '../../context/StateProvider'
/****************************************************************************/


export default function VideoSearch() {

  /**************************    useState    **********************************/
  const [tags, setTags] = useState([]);

	/**************************************************************************/

  /**************************    useContext    *********************************/
  const { setListaDeVideos, videoSeleccionado } = useContext(stateContext);
  /*****************************************************************************/
  

  /************************     fn = selectedTags    **************************/
  // 
  /****************************************************************************/
  const selectedTags = (tags) => {
		console.log(tags);
	};

  /************************     fn = handleSubmit    **************************/
  // 
  /****************************************************************************/
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setListaDeVideos(null);

      console.log("tags", tags)
      const res = await axios.post ('/api/v1/greatVideos/getVideosByTags', 
      {    
        tags : tags,
      });

      console.log("res", res.data.data);
      setListaDeVideos (res.data.data)
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='videoSearch'>
      <TagsInput selectedTags={selectedTags} setTags={setTags} tags={tags}/>

      <form onSubmit={handleSubmit}>
        <button>Buscar</button>
      </form>

      
      {
        videoSeleccionado && (
          <>
            <VideoPlayer link={videoSeleccionado.videoUrl}/>
            <br />
            <p>{videoSeleccionado.myTitle}</p>          
            <p>{videoSeleccionado.myDescription}</p>          
            <p>{videoSeleccionado.originalTitle}</p>          
          </>

        )
      }
    </div>
  )
}
