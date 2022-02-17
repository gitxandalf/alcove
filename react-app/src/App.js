import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/index';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import AddAlbumForm from './components/Forms/AddAlbumForm';
import AlbumDetail from './components/AlbumDetail'
import { getAlbums } from './store/album';
import EditAlbumForm from './components/Forms/EditAlbumForm';
import AddImageForm from './components/Forms/AddImageForm';

function App() {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const albums = useSelector(state => state?.album?.entries);


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getAlbums())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded || !albums) {
    return null;
  }

  return (
    <BrowserRouter>

      <NavBar />

      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <Route path='/' exact={true} >
          <h1>My Home Page</h1>
        </Route>

        <ProtectedRoute exact path='/albums/add-album' >
          <AddAlbumForm albums={albums} />
        </ProtectedRoute>

        <ProtectedRoute exact path='/albums/:albumId/edit-album' >
          <EditAlbumForm albums={albums} />
        </ProtectedRoute>

        <Route path='/albums/:albumId/images'>
          <AlbumDetail albums={albums} />
        </Route>

        <ProtectedRoute exact path='/add-image' >
          <AddImageForm />
        </ProtectedRoute>

      </Switch>

    </BrowserRouter>
  );
}

export default App;
