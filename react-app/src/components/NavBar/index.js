
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getImages } from '../../store/image';
import { getArticles } from '../../store/article';
import { getAlbums } from '../../store/album'
import LogoutButton from '../auth/LogoutButton';
import logo from "../../images/logo.png"
import './NavBar.css'
import { getComments } from '../../store/comment';

const NavBar = () => {

  // const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.session?.user);
  // const images = useSelector(state => state?.images?.entries)
  const [pathName, setPathName] = useState(window.location.pathname);
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    setPathName(window.location.pathname);
    window.scrollTo(0, 0);
  }, [dispatch, user, pathName])

  // useEffect(() => {
  //   dispatch(getImages())
  //   dispatch(getArticles())
  //   dispatch(getAlbums())
  //   dispatch(getComments())
  // }, [dispatch])

  const handleClick = () => {
    if (preview) setPreview(false)
    else setPreview(true)
  }

  return (
    <nav>
      <div className='nav-bar-container'>

        <div className='home'>
          <NavLink exact to='/'><img className='logo' alt="logo" src={logo}></img></NavLink>
        </div>


        <div className='nav-right'>
          <div className='login'>
            <NavLink hidden={user ? true : false} to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </div>

          <div className='signup'>
            <NavLink hidden={user ? true : false} to='/sign-up' exact={true} activeClassName='active'>
              Sign up
            </NavLink>
          </div>

          <div className='logout-preview' onClick={handleClick}>
            {user && <LogoutButton />}
            {/* {user && preview && <LogoutButton />} */}
          </div>

          <div hidden={user ? false : true} className='add-photo'>
            <NavLink to='/add-image' exact={true} activeClassName='active'>
              Submit a photo
            </NavLink>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default NavBar;
