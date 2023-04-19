import "./App.css"
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import VideoAdd from './components/videoAdd/VideoAdd';
import VideoSearch from './components/videoSearch/VideoSearch'

/***************************   React   *****************************/
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/***********************************************************************/


function App() {


  return (
      <Router>
        <Topbar />

        <div className="container">
          <Switch>
            <Route exact path="/">
              <VideoAdd />
            </Route>

            <Route exact path="/video-search">
              <VideoSearch />
              <Sidebar />
            </Route>
          </Switch>
        </div>

      </Router>
  );
}

export default App;
