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
import ImageDetail from './components/ImageDetail';
import EditImageForm from './components/Forms/EditImageForm';
import { getImages } from './store/image';
import { getArticles } from './store/article';
import { getComments } from './store/comment';
import HomePage from './components/HomePage'
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound';
import ProfilePage from './components/ProfilePage'
import ArticleDetail from './components/ArticleDetail'
import AddArticleForm from './components/Forms/AddArticleForm';
import EditArticleForm from './components/Forms/EditArticleForm';
import EditCommentForm from './components/Forms/EditCommentForm';

function App() {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const albums = useSelector(state => state?.album?.entries);


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getAlbums())
      await dispatch(getImages())
      await dispatch(getArticles())
      await dispatch(getComments())
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
          <ProfilePage />
        </ProtectedRoute>

        <Route exact path='/' >
          <HomePage />
        </Route>

        <Route path='/albums/:albumId/images'>
          <AlbumDetail albums={albums} />
        </Route>

        <ProtectedRoute exact path='/albums/add-album' >
          <AddAlbumForm albums={albums} />
        </ProtectedRoute>

        <ProtectedRoute exact path='/albums/:albumId/edit-album' >
          <EditAlbumForm albums={albums} />
        </ProtectedRoute>

        <Route exact path='/images/:imageId'>
          <ImageDetail />
        </Route>

        <ProtectedRoute exact path='/add-image' >
          <AddImageForm />
        </ProtectedRoute>

        <ProtectedRoute exact path='/images/:imageId/edit-image' >
          <EditImageForm />
        </ProtectedRoute>

        <Route exact path='/articles/:articleId'>
          <ArticleDetail />
        </Route>

        <ProtectedRoute exact path='/add-article' >
          <AddArticleForm />
        </ProtectedRoute>

        <ProtectedRoute exact path='/articles/:articleId/edit-article' >
          <EditArticleForm />
        </ProtectedRoute>

        <ProtectedRoute exact path='/comments/:commentId/edit-comment' >
          <EditCommentForm />
        </ProtectedRoute>

        <Route>
          <PageNotFound />
        </Route>

      </Switch>

      <Footer />

    </BrowserRouter>
  );
}

export default App;
