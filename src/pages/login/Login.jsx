import "./login.css"
import axios, { regresaMensajeDeError } from "../../utils/axios";

/*************************    Offline/Online     ****************************/
import { useNavigatorOnLine } from '../../hooks/useNavigatorOnLine';
import OfflineFallback from '../../components/offlineFallback/OfflineFallback';
/****************************************************************************/


/****************************    React    **********************************/
import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
/****************************************************************************/

/****************************    Context API    *****************************/
import { stateContext } from '../../context/StateProvider';
/****************************************************************************/

/***************************    Components     ******************************/
import SnackBarCustom from '../../components/snackBarCustom/SnackBarCustom';
/****************************************************************************/



export default function Login() {

  /***********************     useNavigatorOnLine    ***************************/
  // isOnline es para saber si el usuario esta Online
  const isOnline = useNavigatorOnLine();
  /*****************************************************************************/


  /****************************    useState    ********************************/
  // iconoSnackBarDeExito es boolean que indica si tuvo exito o no la operacion
  // de AXIOS

  const [iconoSnackBarDeExito, setIconoSnackBarDeExito] = useState (true);
  const [mensajeSnackBar, setMensajeSnackBar] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(
    {
      email: "",
      password: ""
    }
  )
  /****************************************************************************/

  /**************************    useHistory    ********************************/
  const history = useHistory();
  /****************************************************************************/


  /**************************    useRef    **********************************/
  // inputRef lo uso para que al cargar la pagina ponga el focus en el nombre
  // del cliente

  const inputRef = useRef(null);
  /*****************************************************************************/

  /**************************    useContext    *********************************/
  const { setCurrentUser } = useContext(stateContext);
  /*****************************************************************************/


  /**************************    useEffect    **********************************/
  // Al cargar la pagina pone el focus en el Username
  useEffect(()=>{
    
    if (!isOnline) {
      return;
    }

    inputRef.current.focus();
  },[isOnline])
  /*****************************************************************************/

 
  /***************************     handleChange    **************************/
  // Es el handle que se encarga de la captura de los inputs
  /**************************************************************************/
  function handleChange(event) {
    // console.log(event)
    const {name, value, type, checked} = event.target
    setData(prevFormData => {
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }
    })
  }

  /***************************     handleSubmit    **************************/
  // Es el handle que se encarga de loggear al Usuario
  /**************************************************************************/
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading)
      return;

    try {
      console.log("voy a loggear")

      setIsLoading(true);

      const res = await axios.post ('/api/v1/users/login', 
          {    
            email : data.email,
            password : data.password
          }	 
      );

      setIsLoading(false);

      // console.log("res", res);
      // console.log("res", res.data.data);

      if (res.data.status === 'success') {
          console.log ('El usuario fue loggeado con éxito!');
          // console.log(res.data.data.user);

          setCurrentUser(res.data.data.user);       

          if (res.data.data.user.role === "admin") {
            history.replace("/");
          }
      } 
    }
    catch(err) {      
      console.log(err);
      setIsLoading(false);
      
      setIconoSnackBarDeExito(false);
      setMensajeSnackBar (regresaMensajeDeError(err));
      setOpenSnackbar(true);
    }
  }

  return (
    <>
      {
        isOnline && (

          <div className="login">
            <SnackBarCustom 
              openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} mensajeSnackBar={mensajeSnackBar} 
              iconoSnackBarDeExito={iconoSnackBarDeExito} />              
    
            <main className="login__main">
              <div className="login__container">

                <div className="heading__container">
                  <h2 className="heading-secondary ma-bt-lg">Inicia sesión</h2>
                </div>
    
                <form className="login__form" onSubmit={handleSubmit}>

                  <div className="login__form-group">
                    <label htmlFor="email" className="form__label" >
                      Correo Electrónico
                    </label>
                    <input 
                      ref={inputRef}
                      type="email" 
                      id="email" 
                      className="form__input" 
                      placeholder='micorreo@ejemplo.com' 
                      required 
                      onChange={handleChange}
                      name="email"
                      value={data.email || ''}
                      title={'El Email debe tener entre 5 y 40 caracteres'}
                      pattern="^.{5,40}$"
                      onInvalid={e=> e.target.setCustomValidity('El Email debe tener entre 5 y 40 caracteres')} 
                      onInput={e=> e.target.setCustomValidity('')} 
                      minLength="5"
                      maxLength="40"
                    />
                  </div>

                  <div className="login__form-group">
                    <label htmlFor="password" className="form__label" >
                      Password
                    </label>
                    <input 
                      type="password" 
                      id="password" 
                      className="form__input" 
                      placeholder='••••••••' 
                      required 
                      minLength="8" 
                      maxLength="20"
                      onChange={handleChange}
                      name="password"
                      title={'El Password debe tener entre 8 y 20 caracteres'}
                      pattern="^.{8,20}$"
                      onInvalid={e=> e.target.setCustomValidity('El Password debe tener entre 8 y 20 caracteres')} 
                      onInput={e=> e.target.setCustomValidity('')} 
                      value={data.password || ''}
                    />
                  </div>

                  <div className="login__form-group align-center ma-bt-md">
                    <Link 
                          className="forgot-password" 
                          to="/forgot-password">¿Olvidaste tu Password?
                    </Link>
                  </div>

                  <div className="login__form-group align-center">
                    <button className="btn btn--green" disabled={isLoading}>
                      {
                        isLoading ? 'Entrando a My Fav Videos' : 'Iniciar mi sesión'
                      }
                    </button>
                  </div>

                </form>
              </div>
            </main>
          </div>
        )
      }
      {
        !isOnline && <OfflineFallback />
      }
    </>

  )
}