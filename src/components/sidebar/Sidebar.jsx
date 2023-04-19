import { useContext } from 'react';
import "./sidebar.css";

/****************************    Context API    *****************************/
import { stateContext } from '../../context/StateProvider';
/****************************************************************************/


export default function Sidebar() {

  /*************************     useContext    *********************************/
  // currentUser es el usuario Actual de la aplicacion
  const { listaDeVideos, setVideoSeleccionado } = useContext(stateContext);
  /*****************************************************************************/

  const handleClick = (currentVideo) => {
    console.log("currentVideo", currentVideo)
    setVideoSeleccionado (currentVideo)
  }


  return (
    <div className="sidebar">
      <div className="sidebarWrapper">

        <div className="sidebarMenu">

          <ul className="sidebarList">

          {
            listaDeVideos && (
              listaDeVideos.map((cur, index) => {
                // console.log("cur.thumnbailUrl", cur.thumbnailUrl)

                return (
                <li key={index} className="sidebarListItem" 
                    onClick={()=>handleClick(cur)}>
                  <img
                    className='videoSidebar' 
                    src={cur.thumbnailUrl} 
                    alt="thumbnail" 
                  />
                  <p className='sidebar--myTitle'>My Title: {cur.myTitle}</p>
                </li> ) 
                }                           
              )
            ) 
          }
            {/* <li className="sidebarListItem">
              TEXT
            </li>

            <li className="sidebarListItem">
              TEXT
            </li>

            <li className="sidebarListItem">
              TEXT
            </li>

            <li className="sidebarListItem">
              TEXT
            </li>

            <li className="sidebarListItem">
              TEXT
            </li>

            <li className="sidebarListItem">
              TEXT
            </li> */}

          </ul>

        </div>

      </div>
    </div>
  );
}
