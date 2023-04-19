import "./topbar.css";


/****************************    React    ***********************************/
import React from "react";
import { Link } from 'react-router-dom';
/****************************************************************************/


export default function Topbar() {


  return (


      <div className="topbar">
        <div className="topbarWrapper">
          <Link className="logoLink" to="/">
                <span className="logo"
                >myFav Videos</span>
          </Link>
          <div className="topRight">
            <p>TEXT</p>
          </div>
        </div>
      </div>
  );
}
