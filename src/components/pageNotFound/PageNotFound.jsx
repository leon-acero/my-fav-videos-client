import "./pageNotFound.css"

/*************************    Offline/Online     ****************************/
import { useNavigatorOnLine } from '../../hooks/useNavigatorOnLine';
import OfflineFallback from '../offlineFallback/OfflineFallback';
/****************************************************************************/

/**************************    React    *************************************/
import { Link } from 'react-router-dom'
/****************************************************************************/


function PageNotFound() {

  /***********************     useNavigatorOnLine    ***************************/
  // isOnline es para saber si el usuario esta Online
  const isOnline = useNavigatorOnLine();
  /*****************************************************************************/

  console.log("NO ENCONTRE")
  return (

    <>
      {
        isOnline && (
            <div className='pageNotFound'>
              <div className='pageNotFound__leftPanel'>
                <div className='pageNotFound__laptops'>

                  <h3 className='pageNotFound__subTitulo'>MY FAV VIDEOS</h3>

                  <div className='pageNotFound_container_titulo'>
                    <h1 className='pageNotFound__titulo'>La página que solicitaste</h1>
                    <h1 className='pageNotFound__titulo'>no existe o no esta disponible</h1>
                  </div>
                  <div className='pageNotFound_container_slogan'>
                    <p className='pageNotFound_slogan'>Vuelve a Iniciar Sesión.</p>
                  </div>
                </div>
                <Link className='pageNotFound__loginButton' to="/login">Iniciar sesión</Link>
              </div>
            </div>
        )
      }
      {
        !isOnline && <OfflineFallback />
      }
    </>
  )
}

export default PageNotFound