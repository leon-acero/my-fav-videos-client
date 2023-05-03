/****************************************************************************/
// Este Componente me ahorra requests ya que tengo que dar click al boton
// Buscar a fuerzas para llamar el API
/****************************************************************************/

import "./topbar.css";


/****************************    React    ***********************************/
import React, { useContext, useState } from 'react'
import axios, { regresaMensajeDeError } from '../../utils/axios';
import { Link } from 'react-router-dom';
/****************************************************************************/

/****************************    Context API    *****************************/
import { stateContext } from '../../context/StateProvider'
/****************************************************************************/

import SnackBarCustom from '../snackBarCustom/SnackBarCustom';


import TagsInput from '../tagsInput/TagsInput';
import { FormControlLabel, Switch } from '@mui/material';


export default function Topbar( { showVideoSearch } ) {

  const [tags, setTags] = useState([]);

  const [iconoSnackBarDeExito, setIconoSnackBarDeExito] = useState (true);
  const [mensajeSnackBar, setMensajeSnackBar] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [checked, setChecked] = useState(false);

  /**************************    useContext    *********************************/
  const { setListaDeVideos } = useContext(stateContext);
  /*****************************************************************************/
  
	
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  

  /************************     fn = handleSubmit    **************************/
  // 
  /****************************************************************************/
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tags.length === 0) {
      setIconoSnackBarDeExito(false);
      setMensajeSnackBar ("Captura por lo menos un tag para realizar la búsqueda");
      setOpenSnackbar(true);
      return;
    }


    try {

      setListaDeVideos(null);

      // console.log("tags", tags)
      const res = await axios.post ('/api/v1/greatVideos/getVideosByTags', 
      {    
        tags : tags,
        checked: checked
      });

      // console.log("res", res.data.data);
      setListaDeVideos (res.data.data)
    }
    catch(err) {
      console.log(err);

      setIconoSnackBarDeExito(false);
      setMensajeSnackBar (regresaMensajeDeError(err));
      setOpenSnackbar(true); 
    }
  }

  return (


      <div className="topbar">

      <SnackBarCustom 
        openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} mensajeSnackBar={mensajeSnackBar} 
        iconoSnackBarDeExito={iconoSnackBarDeExito} />

        <div className="topbarWrapper">
          <Link className="logoLink" to="/">
            <img className="logo" src="./img/youtube-2.png" alt="logo" />
          </Link>

          {
            showVideoSearch && (
              <div className='videoSearch--tagsInput'>
                
                <TagsInput setTags={setTags} tags={tags}/>

                <form className='videoSearch--form' onSubmit={handleSubmit}>

                    <FormControlLabel 
											control={
												<Switch
														checked={checked}
														value={checked}
														onChange={(e)=>handleChange(e)}
														inputProps={{ 'aria-label': 'controlled' }}
														/>
											} 
											label="¿Búsqueda Estricta?" 
											labelPlacement='bottom'
                    />                    


                  <button className='videoSearch--button'>Buscar</button>
                </form>
              </div>
            )

          }

          <div className="topRight">
            <p>TEXT</p>
          </div>
        </div>
      </div>
  );
}
