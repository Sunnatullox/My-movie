
import './App.scss';
import Home from './pages/HomePage/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Watch  from './pages/whatch/Whatch';
import Register  from './pages/register/Register';
import Login  from './pages/login/Login';


function App() {

  const user = true;

  return (
    <Router>
     <Switch>
          <Route exact path="/">
            {user ?<Home />: <Redirect  to="/register"/>}
          </Route>
          <Route path="/register">
          {!user ? <Register />: <Redirect  to="/"/>}
          </Route>
          <Route path="/login">
          {user ?<Login />: <Redirect  to="/register"/>}
          </Route>
          {user && (
            <>
          <Route path="/movies">
            <Home types={"movies"} />
          </Route>
          <Route path="/series">
            <Home types={"series"}/>
          </Route>
          <Route path="/watch">
            <Watch/>
          </Route>
            </>
          )}
        </Switch>
  </Router>
  );
}

export default App;
