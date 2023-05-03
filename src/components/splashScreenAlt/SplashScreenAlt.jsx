import "./splashScreenAlt.css"

/*************************    Offline/Online     ****************************/
import { useNavigatorOnLine } from '../../hooks/useNavigatorOnLine';
import OfflineFallback from '../offlineFallback/OfflineFallback';
/****************************************************************************/

/*******************************    React     *******************************/
import { Link } from 'react-router-dom'
/****************************************************************************/

function SplashScreenAlt() {

  /***********************     useNavigatorOnLine    ***************************/
  // isOnline es para saber si el usuario esta Online
  const isOnline = useNavigatorOnLine();
  /*****************************************************************************/


  return (
    <>
      {
        isOnline && (
          <div className='splashScreenAlt'>
            <div className='splashScreenAlt__leftPanel'>
              <div className='laptops'>
    
                <h3 className='splashScreenAlt__subTitulo'>MY FAV VIDEOS</h3>
    
                <div className='container_titulo'>
                  <h1 className='splashScreenAlt__titulo'>Guarda tus videos favoritos</h1>
                  {/* <h1 className='splashScreenAlt__titulo'></h1> */}
                </div>
                <div className='container_slogan'>
                  <p className='slogan'>Te ofrecemos la forma mas sencilla y práctica de guardar tus videos.</p>
                </div>
              </div>
              <Link className='hero__loginButton' to="/login">Iniciar sesión</Link>
            </div>
            <img className='splashScreenAlt__mujer-modelo' src="/img/website/modelo-con-paleta-recortado_resize.png" alt="Mujer con paleta" />
          </div>      
        )
      }
      {
        !isOnline && <OfflineFallback />
      }
    </>

  )
}

export default SplashScreenAlt