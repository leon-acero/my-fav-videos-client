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
    // console.log("currentVideo", currentVideo)
    setVideoSeleccionado (currentVideo)
  }


  return (
    <div className="sidebar">
      <div className="sidebarWrapper">

        <ul className="sidebarList">
        {
          listaDeVideos && (
            listaDeVideos.map((cur, index) => {
              // console.log("cur.tags", cur.tags)

              return (
                <li key={cur._id} className="sidebarListItem" 
                    onClick={()=>handleClick(cur)}>
                  
                  <div className='sidebarListItem--videoContainer'>
                    <img
                      className='sidebarListItem--video-thumbnail' 
                      src={cur.thumbnailUrl} 
                      alt="thumbnail" 
                    />
                    <span className='sidebarListItem--video-duration'>
                    {cur.duration}
                    </span>
                  </div>
                  
                  <div className='sidebarListItem--video-info'>
                    <p className='sidebar--myTitle'><span>{cur.myTitle}</span></p>
                    <p className='sidebar--myTitle'>{cur.originalTitle}</p>
                    {
                      cur.tags.map((tag, index) => 
                        <p className='sidebarListItem--tags' key={index}>{tag}</p>
                      )
                    }
                  </div>
                  
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
  );
}
