
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.session?.user);
  const images = useSelector(state => state?.images?.entries)
  const [pathName, setPathName] = useState(window.location.pathname);

  useEffect(() => {
    if (sessionUser) dispatch(loadCart(sessionUser.id));
  }, [dispatch, sessionUser])

  useEffect(() => {
    setPathName(window.location.pathname);
    window.scrollTo(0, 0);
  }, [dispatch, sessionUser, pathName])

  return (
    <nav>

      <div className='home'>
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
      </div>

      <div className='login'>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
      </div>

      <div className='signup'>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </div>

      <div className='users'>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
      </div>

      <LogoutButton />

    </nav>
  );
}

export default NavBar;
