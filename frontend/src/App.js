import "./App.scss";
import Home from "./pages/HomePage/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Watch from "./pages/whatch/Whatch";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext"
import MovieInfo from "./pages/movieInfo/MovieInfo";
import Profile from "./pages/userProfile/Profile";
import 'react-toastify/dist/ReactToastify.css';
import Pricing from "./components/pricing/Pricing";
import  NotFound  from "./components/notFound/NotFound";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/register" />}
        </Route>
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">
          {!user ? <Login /> : <Redirect to="/" />}
        </Route>
        {user && (
          <>
            <Route path="/movies">
              <Home types={"movie"} />
            </Route>
            <Route path="/series">
              <Home types={"series"} />
            </Route>
            <Route path="/watch/:id" component={Watch} />
            <Route path="/movieInfo" component={MovieInfo} />
            <Route path="/myProfile" component={Profile} />
            <Route path="/pricing" component={Pricing} />
            {/* <Route path="*" component={NotFound} /> */}
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
