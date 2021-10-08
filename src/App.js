import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home';
import Login from './pages/Login'
import Signup from './pages/Signup';
import { useDispatch, useSelector } from 'react-redux';
import PublicRoute from './Routes/PublicRoute'
import { PrivateRoute } from './Routes/PrivateRoute'
import Chat from './pages/Chat';
import { auth } from 'firebase';
import { useEffect } from 'react';
import { setAuth } from './Actions/action';
function App() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.authData)
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setAuth({ authenticated: true, loading: false }));
      } else {
        dispatch(setAuth({ authenticated: false, loading: false }));
      }
    })
  }, [])

  return (
    data.loading === true ? (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>) : (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/chat" authenticated={data.authenticated} component={Chat} />
            <PublicRoute exact path="/login" authenticated={data.authenticated} component={Login} />
            <PublicRoute exact path="/signup" authenticated={data.authenticated} component={Signup} />
          </Switch>
        </Router>
      </div>
    )
  );
}
export default App;
