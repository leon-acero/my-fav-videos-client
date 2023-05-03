import "./App.css"
import ResultsContainer from './components/resultsContainer/ResultsContainer';
// import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import VideoAdd from './components/videoAdd/VideoAdd';
import PageNotFound from './components/pageNotFound/PageNotFound';
// import VideoSearch from './components/videoSearch/VideoSearch'

/***************************   React   *****************************/
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from 'react';
/***********************************************************************/

/***************************   Provider   ******************************/
import { stateContext } from './context/StateProvider';
/***********************************************************************/

/***************************   Pages   *****************************/
import Login from './pages/login/Login';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';
import SplashScreenAlt from './components/splashScreenAlt/SplashScreenAlt';
import Logout from './components/logout/Logout';
/***********************************************************************/


function App() {

  const { currentUser } = useContext(stateContext);

  return (
      <Router>

        {/* Muestro la SplashScreen si no hay usuario loggeado */}
        {
          !currentUser && (
              <>              
                <Topbar showVideoSearch={false}/>

                <Switch>
                  <Route exact path="/">
                    <SplashScreenAlt />
                  </Route>

                  <Route exact path="/login">
                    <Login />
                  </Route>

                  <Route exact path="/forgot-password">
                    <ForgotPassword />
                  </Route>

                  <Route exact path="/reset-password/:resetToken">
                    <ResetPassword />
                  </Route>

                  <Route path="*">
                    <PageNotFound />
                  </Route>
                </Switch>
              </>
          ) 
        }

        {/* Si estas loggeado */}
        {
          currentUser && (
            <div className="container">
              <Switch>
                <Route exact path="/">
                  <Topbar showVideoSearch={false} />
                  <VideoAdd />
                </Route>

                <Route exact path="/video-search">
                  <Topbar showVideoSearch={true} />
                  <ResultsContainer />
                </Route>

                <Route path="/logout">
                  <Logout />
                </Route>

                <Route path="*">
                  <PageNotFound />
                </Route>
              </Switch>
            </div>
          )
        }
      </Router>
  );
}

export default App;
