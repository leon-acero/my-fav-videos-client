import './videoAdd.css'
import TagsInput from '../tagsInput/TagsInput'

import {useState} from "react"
import axios from "../../utils/axios"
import VideoPlayer from '../videoPlayer/VideoPlayer'


const INITIAL_STATE = { 
  myTitle: "", 
  myDescription: "", 
  youtubeLink: "",
}

export default function VideoAdd() {

  /**************************    useState    **********************************/
	// itemData
	// allAboutVideo
	// isSaving
	// tags

	const [itemData, setItemData] = useState (INITIAL_STATE);

  const [allAboutVideo, setAllAboutVideo] = useState ({
    channelLogo: {},
    videoDetails: {},
    videoDuration: ""
  })

  const [isSaving, setIsSaving] = useState(false);

  const [tags, setTags] = useState(['Abs', 'Athlean-X']);
	/**************************************************************************/


  /************************     fn = selectedTags    **************************/
  // 
  /****************************************************************************/
  const selectedTags = (tags) => {
		console.log(tags);
	};

  /************************     fn = handleChange    **************************/
  // 
  /****************************************************************************/
	const handleChange = (event) => {
    // console.log(event)

    const {name, value, type, checked} = event.target
    setItemData(prevFormData => {
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }
    })
  }

  /************************     fn = handleSubmit    **************************/
  // 
  /****************************************************************************/
  const handleSubmit = async (e) => {
    e.preventDefault();
      
    try {

      const res = await axios.post ('/api/v1/greatVideos/search-youtube', 
      {    
        youtubeLink : itemData.youtubeLink,
      });

      // console.log("res", res.data.data);

      // Esta es la informacion que me regresa el Youtube API
      setAllAboutVideo({
        channelLogo: {
          url: res.data.data.channelLogo.medium.url,
          width: res.data.data.channelLogo.medium.width,
          height: res.data.data.channelLogo.medium.height
        },

        videoDetails: {
          videoId: res.data.data.videoDetails.items[0].id,
          channelId: res.data.data.videoDetails.items[0].snippet.channelId,
          channelTitle: res.data.data.videoDetails.items[0].snippet.channelTitle,
          videoTitle: res.data.data.videoDetails.items[0].snippet.title,
          videoDescription: res.data.data.videoDetails.items[0].snippet.description,
          videoThumbnailUrl: res.data.data.videoDetails.items[0].snippet.thumbnails.maxres.url,
          videoThumbnailHeight: res.data.data.videoDetails.items[0].snippet.thumbnails.maxres.height,
          videoThumbnailWidth: res.data.data.videoDetails.items[0].snippet.thumbnails.maxres.width
        },
        
        videoDuration: res.data.data.videoDuration
      })
    }
    catch(err) {
      console.log(err);
    }
  }


  /**********************     fn = handleAgregarAMiLista    *******************/
  // 
  /****************************************************************************/	
  const handleAgregarAMiLista = async (e) => {
    e.preventDefault();

    if (isSaving)
      return;
      
    try {
      setIsSaving(true);
     
      console.log(tags)

      const res = await axios.post ('/api/v1/greatVideos', {
        "myTitle": itemData.myTitle,
        "myDescription": itemData.myDescription,
  
	      "channelTitle": allAboutVideo.videoDetails.channelTitle,
        "channelId": allAboutVideo.videoDetails.channelId,
        "videoId": allAboutVideo.videoDetails.videoId,
        "videoUrl": itemData.youtubeLink,
        "originalTitle": allAboutVideo.videoDetails.videoTitle,
        "originalDescription": allAboutVideo.videoDetails.videoDescription,
        "thumbnailUrl": allAboutVideo.videoDetails.videoThumbnailUrl,
        "thumbnailWidth": allAboutVideo.videoDetails.videoThumbnailWidth,
        "thumbnailHeight": allAboutVideo.videoDetails.videoThumbnailHeight,
  
        "profileLogoUrl": allAboutVideo.channelLogo.url,
        "profileLogoWidth": allAboutVideo.channelLogo.width,
        "profileLogoHeight": allAboutVideo.channelLogo.height,
  
        "duration": allAboutVideo.videoDuration,
        
        "tags": tags,      
      } );

      setIsSaving(false);

      if (res.data.status === 'success') {
        // alert ('Logged in succesfully!');
        // console.log(res.data.data.data);
        console.log ('Se agregó con éxito!');
        // setIconoSnackBarDeExito(true);
        // setMensajeSnackBar("El Cliente fue creado")
        // setOpenSnackbar(true);

        setItemData(INITIAL_STATE);
      } 
    }
    catch(err) {
      console.log(err);

      setIsSaving(false);
              
      // setIconoSnackBarDeExito(false);
      // setMensajeSnackBar (regresaMensajeDeError(err));

      // setOpenSnackbar(true);      
    }
  }


  return (
    <div className='videoAdd'>

      <form className='videoAdd--buscarVideo' onSubmit={handleSubmit}> 
        <label htmlFor='youtubeLink'>Agrega el link de tu video favorito</label>

        <input 
            className="inputGeneralDataType"
            placeholder="https://youtube.com/" 
            onChange={handleChange}
            name="youtubeLink"
            value={itemData.youtubeLink}  
            required
        />
        <button>Obten informacion del Video</button>
      </form>

			<VideoPlayer link={itemData.youtubeLink}/>
      
      <p>Duracion: {allAboutVideo.videoDuration}</p>
      <p>Video Title: {allAboutVideo.videoDetails.videoTitle}</p>
      <p>Channel Title: {allAboutVideo.videoDetails.channelTitle}</p>
      <img src={allAboutVideo.channelLogo.url} alt={allAboutVideo.channelLogo.url} />

      <br />

      <form onSubmit={handleAgregarAMiLista}>
        <label htmlFor='myTitle'>My Title</label>

        <input 
            className="inputGeneralDataType"
            placeholder="" 
            onChange={handleChange}
            name="myTitle"
            value={itemData.myTitle}  
            required
        />

        <label htmlFor='myDescription'>My Description</label>

        <input 
            className="inputGeneralDataType"
            placeholder="" 
            onChange={handleChange}
            name="myDescription"
            value={itemData.myDescription}  
            required
        />
        <TagsInput selectedTags={selectedTags} setTags={setTags} tags={tags}/>
  
        <button 
          className="newClientButton" 
          disabled={isSaving}
        >
         {isSaving ? 'Grabando...' : 'Agregar a mi Lista'}
        </button>
      </form>

    </div>
  )
}
