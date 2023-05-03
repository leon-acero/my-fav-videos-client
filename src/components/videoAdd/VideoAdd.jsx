import './videoAdd.css'
import TagsInput from '../tagsInput/TagsInput'

import {useContext, useState} from "react"
import axios, { regresaMensajeDeError } from "../../utils/axios"
import VideoPlayer from '../videoPlayer/VideoPlayer'
import {FaBookmark, FaSearch} from "react-icons/fa";

import SnackBarCustom from '../../components/snackBarCustom/SnackBarCustom';
import { CircularProgress } from '@mui/joy'
import { stateContext } from '../../context/StateProvider'


const INITIAL_STATE = { 
  myTitle: "", 
  myDescription: "", 
  videoUrl: "",
}

const INITIAL_STATE_ALL_ABOUT_VIDEO = {
  channelTitle: "", 
  channelId: "",
      
  profileLogoUrl: "", 
  profileLogoWidth: "", 
  profileLogoHeight: "", 
      
  videoId: "", 
  videoUrl: "", 
  originalTitle: "", 
  originalDescription: "", 

  duration: "", 
      
  thumbnailUrl: "", 
  thumbnailWidth: "", 
  thumbnailHeight: "",

  user: ""
}

export default function VideoAdd() {

  /**************************    useState    **********************************/
	// itemData
	// allAboutVideo
	// isSaving
	// tags
  // isLoading

	const [itemData, setItemData] = useState (INITIAL_STATE);

  const [allAboutVideo, setAllAboutVideo] = useState (INITIAL_STATE_ALL_ABOUT_VIDEO)
  
  const [tags, setTags] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [iconoSnackBarDeExito, setIconoSnackBarDeExito] = useState (true);
  const [mensajeSnackBar, setMensajeSnackBar] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
	/**************************************************************************/

  const { currentUser } = useContext(stateContext);


  /************************     fn = handleInputChange    *********************/
  // Maneja el cambio en los inputs de la pagina y actualiza sus states
  /****************************************************************************/
	const handleInputChange = (event) => {
    // console.log(event)
    // console.log("handleInputChange")

    const {name, value, type, checked} = event.target
    setItemData(prevFormData => {
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }
    })
  }

  /************************     fn = handleSubmitVideoUrl    *******************/
  // Hace POST para cargar un Video de Youtube y obtener su informacion
  /****************************************************************************/
  const handleSubmitVideoUrl = async (e) => {
    e.preventDefault();

    // console.log("handleSubmitVideoUrl")
      
    try {

      setIsLoading(true);
      const res = await axios.post ('/api/v1/greatVideos/search-youtube', 
      {    
        videoUrl : itemData.videoUrl,
      });

      // console.log("res", res);
      setIsLoading(false);

      setAllAboutVideo(
        {
        channelTitle: res.data.data.channelTitle, 
        channelId: res.data.data.channelId,
            
        profileLogoUrl: res.data.data.profileLogoUrl, 
        profileLogoWidth: res.data.data.profileLogoWidth, 
        profileLogoHeight: res.data.data.profileLogoHeight, 
            
        // Info del Video
        videoId: res.data.data.videoId, 
        videoUrl: res.data.data.videoUrl, 
        originalTitle: res.data.data.originalTitle, 
        originalDescription: res.data.data.originalDescription, 

        duration: res.data.data.duration, 
            
        // Info del Thumbnail del Video
        thumbnailUrl: res.data.data.thumbnailUrl, 
        thumbnailWidth: res.data.data.thumbnailWidth, 
        thumbnailHeight: res.data.data.thumbnailHeight,

        user: currentUser._id,
      });

      let tempArray = []
      if (res?.data?.data?.channelTitle)
        tempArray.push(res.data.data.channelTitle)

      if (res?.data?.data?.originalTitle)
        tempArray.push(res.data.data.originalTitle)

      setTags(tempArray);
      setItemData(prevFormData =>  {
        return {
          ...prevFormData, myTitle: "", myDescription: ""
        }
      });

    }
    catch(err) {
      console.log(err);
      setIsLoading(false);

      setIconoSnackBarDeExito(false);
      setMensajeSnackBar (regresaMensajeDeError(err));
      setOpenSnackbar(true); 
    }
  }


  /**********************     fn = handleSubmitNewGreatVideo    ****************/
  // Hace POST para agregar un video a la Base de Datos
  /****************************************************************************/	
  const handleSubmitNewGreatVideo = async (e) => {
    e.preventDefault();

    if (allAboutVideo.channelId === "") {
      setIconoSnackBarDeExito(false);
      setMensajeSnackBar ("Busca un video antes de grabar");
      setOpenSnackbar(true); 
      return;
    }

    if (itemData.myTitle === "") {
      setIconoSnackBarDeExito(false);
      setMensajeSnackBar ("Agrega un Título al video antes de grabar");
      setOpenSnackbar(true); 
      return;
    }

    if (tags.length === 0) {
      setIconoSnackBarDeExito(false);
      setMensajeSnackBar ("Agrega por lo menos un Tag antes de grabar");
      setOpenSnackbar(true); 
      return;
    }

    if (isSaving)
      return;
      
    try {
      setIsSaving(true);
     
      // console.log(tags)

      const res = await axios.post ('/api/v1/greatVideos', {
        "myTitle": itemData.myTitle,
        "myDescription": itemData.myDescription,
  
	      "channelTitle": allAboutVideo.channelTitle,
        "channelId": allAboutVideo.channelId,
        "videoId": allAboutVideo.videoId,
        "videoUrl": allAboutVideo.videoUrl,
        "originalTitle": allAboutVideo.originalTitle,
        "originalDescription": allAboutVideo.originalDescription,
        "thumbnailUrl": allAboutVideo.thumbnailUrl,
        "thumbnailWidth": allAboutVideo.thumbnailWidth,
        "thumbnailHeight": allAboutVideo.thumbnailHeight,
  
        "profileLogoUrl": allAboutVideo.profileLogoUrl,
        "profileLogoWidth": allAboutVideo.profileLogoWidth,
        "profileLogoHeight": allAboutVideo.profileLogoHeight,
  
        "duration": allAboutVideo.duration,
        
        "tags": tags,
        "user": allAboutVideo.user
      } );

      setIsSaving(false);

      if (res.data.status === 'success') {
        setIconoSnackBarDeExito(true);
        setMensajeSnackBar("El Video fue agregado")
        setOpenSnackbar(true);

        // Limpia los inputs y states para cargar un nuevo video
        setItemData(INITIAL_STATE);
        setAllAboutVideo(INITIAL_STATE_ALL_ABOUT_VIDEO);
        setTags([]);
      } 
    }
    catch(err) {
      console.log(err);

      setIsSaving(false);
              
      setIconoSnackBarDeExito(false);
      setMensajeSnackBar (regresaMensajeDeError(err));
      setOpenSnackbar(true);      
    }
  }

  return (
    <div className='videoAdd'>

      <SnackBarCustom 
        openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} mensajeSnackBar={mensajeSnackBar} 
        iconoSnackBarDeExito={iconoSnackBarDeExito} />

      {/* Esta es la form donde pones el url de un video */}
      <form className='videoAdd--buscarVideo' onSubmit={handleSubmitVideoUrl}>

        <div className='videoAdd--buscarVideo-container'>
          <label htmlFor='videoUrl'>Agrega el link de tu video favorito</label>

          <input 
              className="inputGeneralDataType"
              placeholder="https://youtube.com/" 
              onChange={handleInputChange}
              name="videoUrl"
              value={itemData.videoUrl}  
              required
          />
        </div>
        
        {
          isLoading 
          ? 
            <button className='videoAdd--cargandoInformacion-button'
                    disabled={false}>
              <CircularProgress size="sm" />
            </button>
          :
            <button className='button'
                    disabled={false}>
              <span className='button__text'>
                Buscar
              </span>
              <span className='button__icon'>
                <FaSearch />
              </span>
            </button>
        }        
      </form>

      {/* Este es el div para que el usuario capture los datos de un video 
          como Titulo, Descripcion y tags.
          Tambien se muestra el video que se cargó
      */}
      <div className='videoAdd--container'>
        <div className='videoAdd--videoPlayer'>
          <VideoPlayer video={allAboutVideo}/>
        </div>

        <div className='videoAdd--detailsSection'>
          <div className='videoAdd--detailsSection-form'>
        
            <label htmlFor='myTitle'>Título (obligatorio)</label>
            <input 
                className="inputGeneralDataType"
                placeholder="Ejemplo: Pierna -- Athlean-X" 
                onChange={handleInputChange}
                name="myTitle"
                value={itemData.myTitle}  
                required
            />
          </div>

          <div className='videoAdd--detailsSection-form'>
            <label htmlFor='myDescription'>Descripción (opcional)</label>
            <textarea 
                className="inputGeneralDataType textareaStyle"
                placeholder="Esta es una guía de ejercicios para Cuadríceps" 
                onChange={handleInputChange}
                name="myDescription"
                value={itemData.myDescription}  
            />
          </div>

      
          <TagsInput setTags={setTags} tags={tags}/>

          <form className='videoAdd--createForm' 
                onSubmit={handleSubmitNewGreatVideo}>

            {
              isSaving 
              ? 
                <button className='videoAdd--cargandoInformacion-button'
                        disabled={false}>
                  <CircularProgress size="sm" />
                </button>
              :
                <button className='button'
                        disabled={false}>
                  <span className='button__text'>
                    Grabar
                  </span>
                  <span className='button__icon'>
                    <FaBookmark />
                  </span>
                </button>
            }  

            {/* <button className={isSaving 
                            ? 'videoAdd--cargandoInformacion-button' 
                            : 'button'}
                    disabled={isSaving}>
              <span className={isSaving 
                                ? 'button__text-disabled' 
                                : 'button__text'}>
                    Grabar
              </span>
              <span className={isSaving 
                                ? 'button__icon-disabled' 
                                : 'button__icon'}>
                    <FaBookmark />
              </span>
            </button> */}
          </form> 
        </div>

      </div>
      
    </div>
  )
}
