/****************************************************************************/
// Este Componente me hace gastar muchos requests ya que cada vez que le
// doy click al <Switch> o que agrego tags o quito tags automaticamente
// manda llamar el API
/****************************************************************************/

import "./topbar.css";
import defaultCameraImage from "../../camera.webp";

/****************************    Custom Hooks    ****************************/
import { useNavigatorOnLine } from '../../hooks/useNavigatorOnLine'
/****************************************************************************/

/****************************    React    ***********************************/
import React, { useCallback, useContext, useEffect, useState } from 'react'
import axios, { regresaMensajeDeError } from '../../utils/axios';
import { Link } from 'react-router-dom';
/****************************************************************************/

/****************************    Context API    *****************************/
import { stateContext } from '../../context/StateProvider'
/****************************************************************************/

import SnackBarCustom from '../snackBarCustom/SnackBarCustom';

/**************************    Material UI    *******************************/
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
/****************************************************************************/

/**************************    React-Icons    *******************************/
import { FaHandshake, FaSignOutAlt } from "react-icons/fa";
/****************************************************************************/


import TagsInput from '../tagsInput/TagsInput';
import { FormControlLabel, Switch } from '@mui/material';
import { CircularProgress } from '@mui/joy';


export default function Topbar( { showVideoSearch } ) {

  const [tags, setTags] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [iconoSnackBarDeExito, setIconoSnackBarDeExito] = useState (true);
  const [mensajeSnackBar, setMensajeSnackBar] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [checked, setChecked] = useState(false);

  /**************************    useContext    *********************************/
  const { listaDeVideos, setListaDeVideos } = useContext(stateContext);
  /*****************************************************************************/
  
  /***********************     useNavigatorOnLine    ***************************/
  // isOnline es para saber si el usuario esta Online
  const isOnline = useNavigatorOnLine();
  /*****************************************************************************/
  
  /*************************     useContext    *********************************/
  // currentUser es el usuario Actual de la aplicacion
  const { currentUser } = useContext(stateContext);
  /*****************************************************************************/

  /***************************     useState    *********************************/
  const [anchorEl, setAnchorEl] = useState(null);
  /*****************************************************************************/

  /***************************                 *********************************/
  const openMenu = Boolean(anchorEl);
  /*****************************************************************************/

  /***************************     handleClick    ******************************/
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  /*****************************************************************************/

  /***************************     handleClose    ******************************/
  const handleClose = () => {
    setAnchorEl(null);
  };
  /*****************************************************************************/


  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  
  
  const callAxios = useCallback (async () => {
    
    try {
      setIsLoading(true);

      setListaDeVideos(null);

      // console.log("tags", tags)
      const res = await axios.post ('/api/v1/greatVideos/getVideosByTags', 
      {    
        tags : tags,
        checked: checked
      });

      setIsLoading(false);

      console.log("res", res?.data?.data?.length);
      setListaDeVideos (res.data.data)
    }
    catch(err) {
      console.log(err);

      setIsLoading(false);
      setIconoSnackBarDeExito(false);
      setMensajeSnackBar (regresaMensajeDeError(err));
      setOpenSnackbar(true); 
    }
  }, [checked, setListaDeVideos, tags])



  useEffect(()=> {

    const updatePage = async () => {

      callAxios()
    }

    if (tags.length > 0) {
      updatePage();
    }

  }, [callAxios, tags.length])


  return (

      <div className={showVideoSearch ? 'topbar' : 'topbar topbar--ajustaHeight'}>

      <SnackBarCustom 
        openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} mensajeSnackBar={mensajeSnackBar} 
        iconoSnackBarDeExito={iconoSnackBarDeExito} />

        <div className="topbarWrapper">
          <Link to="/">
            <img className="logo" src="./img/youtube-2.png" alt="logo" />
          </Link>

          {
            showVideoSearch && (
              <div className='videoSearch--tagsInput'>
                
                <TagsInput setTags={setTags} tags={tags}/>

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

                {
                  isLoading 
                  ? 
                    <CircularProgress size="md" />
                  :
                    listaDeVideos?.length > 0 &&
                      <p className='videoSearch--resultados'>
                        {listaDeVideos?.length} Resultados
                      </p>
                }
              </div>
            )
          }

          <div className="topRight">
            {             
              currentUser && (
              <div className="authStyle">
                <img 
                    src={currentUser.photo ?
                      `${currentUser.photo}` : defaultCameraImage} 
                    alt="{currentUser.name}" 
                    className="topAvatar"  
                    onClick={handleClick}
                />
                <span className={isOnline ? 'online-offline online' : 'online-offline offline'}></span>

              </div>)
            }

            { !currentUser && (
                <div className="authStyle">
                  <Link className='loginButton' to="/login">Iniciar sesión</Link>
                </div>
              )
            }

            {
              currentUser && (
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openMenu}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem className="menuItem tipografia" >
                    <Link className='liga__flex menuGeneralButton' 
                          to="/video-search"
                    >
                      <ListItemIcon>
                        <FaHandshake className="iconos__placeOrder" />
                      </ListItemIcon>
                      Buscar Videos
                    </Link>
                  </MenuItem>

                  <Divider />

                  <MenuItem className="menuItem" >
                    <Link className='liga__flex menuGeneralButton' to="/logout">
                      <ListItemIcon>
                        <FaSignOutAlt className="iconos__general" />
                      </ListItemIcon>
                      Cerrar Sesión</Link>
                  </MenuItem>
                </Menu>          
              )
            }
          </div>
        </div>
      </div>
  );
}