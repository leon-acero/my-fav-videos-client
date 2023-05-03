import "./resetPassword.css"
import axios, { regresaMensajeDeError } from '../../utils/axios';

/*************************    Offline/Online     ****************************/
import { useNavigatorOnLine } from '../../hooks/useNavigatorOnLine';
import OfflineFallback from '../../components/offlineFallback/OfflineFallback';
/****************************************************************************/

/*******************************    React     *******************************/
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
/****************************************************************************/

/*******************************    Components    ***************************/
import SnackBarCustom from '../../components/snackBarCustom/SnackBarCustom';
/****************************************************************************/


function ResetPassword() {

  /**********************    useNavigatorOnLine    ****************************/
  // Para saber si el Usuario esta Online
  const isOnline = useNavigatorOnLine();
  /****************************************************************************/


  /****************************    useState    *******************************/

  // iconoSnackBarDeExito es boolean que indica si tuvo exito o no la operacion
  // de AXIOS

  const [iconoSnackBarDeExito, setIconoSnackBarDeExito] = useState (true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [mensajeSnackBar, setMensajeSnackBar] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [data, setData] = useState(
    {
      password: "",
      confirmPassword: ""
    }
  )
  /****************************************************************************/


  /****************************    useParams    *******************************/
  // history lo uso para redireccionar la página a /search-client cuando el pedido
  // haya sido borrado 
  const history = useHistory();
  /*****************************************************************************/  

  
  /**************************    useParams    **********************************/
  // resetToken es el Reset Token viene en el URL, me sirve para

  const {resetToken } = useParams();
  /*****************************************************************************/


  /************************     handleSubmit    *******************************/
  // Aqui guardo la informacion en la BD, puede ser exitoso o haber error
  /****************************************************************************/

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending)
      return;

    if (!isOnline) {
      setIconoSnackBarDeExito(false);
      setMensajeSnackBar("No estas en línea, checa tu conexión a Internet.")
      setOpenSnackbar(true);
      return;
    }

    try {

        if (resetToken === "") {
          setIconoSnackBarDeExito(false);
          setMensajeSnackBar("No existe un Token para hacer el cambio de Password.")
          setOpenSnackbar(true);
          return;
        }

        setIsSending(true);

        const res = await axios.patch (`/api/v1/users/resetPassword/${resetToken}`, {    
          password : data.password,
          confirmPassword : data.confirmPassword
        });

        console.log("res", res);

        setIsSending(false);

        if (res.data.status === 'success') {
          // console.log(res.data.data.data);
          console.log ('El password fue actualizado con éxito!');
          setIconoSnackBarDeExito(true);
          setMensajeSnackBar("Password actualizado. Vuelve a iniciar Sesión.")
          setOpenSnackbar(true);

          // Redirecciono después de 5 segundos a SearchClient osea /search-client
          setTimeout(()=>{
            history.replace("/login");
          }, 5000);
        } 
      }
      catch(err) {
        console.log(err);
        setIsSending(false);
        
        setIconoSnackBarDeExito(false);
        setMensajeSnackBar (regresaMensajeDeError(err));
        setOpenSnackbar(true);
      }
  }
  
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


  return (
    <>
      {
        isOnline && (
          <div className='resetPassword'>

            <SnackBarCustom 
                openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} mensajeSnackBar={mensajeSnackBar} 
                iconoSnackBarDeExito={iconoSnackBarDeExito} />
      
            <main className="main-resetPassword">
              <div className="form-resetPassword">
                <h2 className='heading-secondary ma-bt-lg'>Cambia tu Password</h2>
      
                <form className='form--reset-password' onSubmit={handleSubmit}>
                  <div className='form__group'>
                    <label 
                          htmlFor='password' 
                          className='form__label' >Password
                    </label>
                    <input 
                          id="password" 
                          className='form__input' 
                          type="password" 
                          placeholder='••••••••' 
                          required 
                          minLength="8"
                          value={data.password || ''}
                          name="password"
                          onInvalid={e=> e.target.setCustomValidity('El Password debe ser de mínimo 8 caracteres')} 
                          onInput={e=> e.target.setCustomValidity('')} 
                          onChange={handleChange} />
                  </div>
                  <div className='form__group ma-bt-md'>
                    <label 
                          htmlFor='confirmPassword' 
                          className='form__label'>Confirma el Password
                    </label>
                    <input 
                          id="confirmPassword" 
                          className='form__input' 
                          type="password" 
                          placeholder='••••••••' 
                          required 
                          minLength="8"
                          value={data.confirmPassword || ''}
                          name="confirmPassword"
                          onInvalid={e=> e.target.setCustomValidity('La confirmación del Password debe ser de mínimo 8 caracteres')} 
                          onInput={e=> e.target.setCustomValidity('')}
                          onChange={handleChange} />
                  </div>
                  <div className='form__group form__button'>
                    <button className='btn btn--green' disabled={isSending}>{isSending ? 'Enviando...' : 'Enviar'}</button>
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

export default ResetPassword