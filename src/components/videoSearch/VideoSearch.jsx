import "./videoSearch.css"

import React, { useContext, useEffect } from 'react'

import {useState} from "react"
import axios, { regresaMensajeDeError } from "../../utils/axios"
import VideoPlayer from '../videoPlayer/VideoPlayer'
import {FaBookmark} from "react-icons/fa";

import SnackBarCustom from '../../components/snackBarCustom/SnackBarCustom';
import TagsInput from '../tagsInput/TagsInput';

/****************************    Context API    *****************************/
import { stateContext } from '../../context/StateProvider'
/****************************************************************************/

const INITIAL_STATE = { 
  myTitle: "", 
  myDescription: "", 
  videoUrl: "",
}


export default function VideoSearch() {

  const [itemData, setItemData] = useState (INITIAL_STATE);
  
  const [tags, setTags] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [iconoSnackBarDeExito, setIconoSnackBarDeExito] = useState (true);
  const [mensajeSnackBar, setMensajeSnackBar] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  /**************************    useContext    *********************************/
  const { videoSeleccionado, setVideoSeleccionado, setListaDeVideos } = useContext(stateContext);
  /*****************************************************************************/
  

  useEffect(()=> {

    if (videoSeleccionado?.myTitle !== undefined) {
      setItemData({
        myTitle: videoSeleccionado?.myTitle,
        myDescription: videoSeleccionado?.myDescription,
        videoUrl: videoSeleccionado?.videoUrl,
      });

      setTags(videoSeleccionado?.tags)

    }

  }, [videoSeleccionado?.myTitle, videoSeleccionado?.myDescription, videoSeleccionado?.videoUrl, videoSeleccionado?.tags])

// console.log("itemData", itemData);
// console.log("tags", tags)
// console.log("videoSeleccionado", videoSeleccionado)

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


  /**********************     fn = handleSubmitNewGreatVideo    ****************/
  // Hace POST para agregar un video a la Base de Datos
  /****************************************************************************/	
  const handleSubmitNewGreatVideo = async (e) => {
    e.preventDefault();

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

      // Actualizo en Base de Datos
      const res = await axios.patch (`/api/v1/greatVideos/${videoSeleccionado._id}`, {
        "myTitle": itemData.myTitle,
        "myDescription": itemData.myDescription,
        "tags": tags,
      } );

      // console.log("res", res.data.data.data);

      setIsSaving(false);

      if (res.data.status === 'success') {

        // Actualizco la lista de Videos para que en el sidebar se actualice
        // los cambios que acabo de hacer, es para que el usuario vea lo mas
        // actual en pantalla
        setListaDeVideos(prevSquares => {

          const newArray = prevSquares.map(curObj => {
            if (curObj._id === videoSeleccionado._id) {
              return {
                ...curObj,
                myTitle: itemData.myTitle,
                myDescription: itemData.myDescription,
                tags: tags
              }
            }
            else {
              return curObj
            }
          })
     
          return newArray;
        })

        // actualizo en pantalla el video que acabo de actualizar en BD
        // setVideoSeleccionado(prevFormData => {
        //   return {
        //     ...prevFormData, 
        //     myTitle: itemData.myTitle,
        //     myDescription: itemData.myDescription,
        //     tags: tags
        //   }
        // })
        setVideoSeleccionado(res.data.data.data);

        setIconoSnackBarDeExito(true);
        setMensajeSnackBar("La información del Video fue actualizada")
        setOpenSnackbar(true);
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
    <div className='videoSearch'>
      <SnackBarCustom 
        openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} mensajeSnackBar={mensajeSnackBar} 
        iconoSnackBarDeExito={iconoSnackBarDeExito} />

      {
        videoSeleccionado && (
          <>
            {/* <div className='videoSearch--videoSeleccionado'>
              <VideoPlayer video={videoSeleccionado}/>
            </div> */}
      
            {/* Este es el div para que el usuario capture los datos de un video 
                como Titulo, Descripcion y tags.
                Tambien se muestra el video que se cargó
            */}
            <div className='videoSearch--container'>
              <div className='videoSearch--videoSeleccionado'>
                <VideoPlayer video={videoSeleccionado}/>
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

                <form className='videoAdd--createForm' onSubmit={handleSubmitNewGreatVideo}>
                  <button className={isSaving 
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
                  </button>
                </form> 
              </div>

            </div>      
          </>
        )
      }
    </div>
  )
}
