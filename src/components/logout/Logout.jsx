import axios from "../../utils/axios";

/*******************************    React     *******************************/
import { useEffect, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom';
/*****************************************************************************/

/*******************************    Context API     **************************/
import { stateContext } from '../../context/StateProvider';
/*****************************************************************************/



export default function Logout() {

  /*******************************   useHistory     **************************/
  const history = useHistory();
  /***************************************************************************/

  /*******************************   useContext     **************************/
  const { setCurrentUser } = useContext(stateContext);
  /***************************************************************************/

  /**************************    useRef    **********************************/
  // avoidRerenderFetchLogout evita que se mande llamar dos veces al
  // cliente y por lo mismo que se pinte dos veces
  
  const avoidRerenderFetchLogout = useRef(false);
  /***************************************************************************/

  /************************     useEffect    *******************************/
  // logout mandao cargar desde la BD el Producto que me ineteresa
  // actualizar
  /************************************************************************/
  useEffect (() => {

    if (avoidRerenderFetchLogout.current) {
      return;
    }

    
    const logout = async () => {

      // solo debe de cargar datos una vez, osea al cargar la pagina
      avoidRerenderFetchLogout.current = true;

      console.log("useEffect")
      try {

        const res = await axios.get ('/api/v1/users/logout');

        console.log("Usuario desloggeado")
        // console.log("res", res);
        if (res.data.status === 'success') {
          setCurrentUser(null);
          history.replace("/");
        }
      }
      catch(err) {
        console.log(err);
      }
    }

    logout();
   
  }, [history, setCurrentUser]); 
}
