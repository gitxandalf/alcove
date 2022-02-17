import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';
import logo from "../../images/logo.png"
import ProfileButton from './ProfileButton';

const LogoutButton = () => {

  const user = useSelector(state => state?.session?.user);

  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <div class="dropdown">
        <span><img onClick={openMenu} id="logout" className='logo' alt="profile-icon" src={user && user.profile_image_url}></img></span>
        {showMenu && (
          <div class="dropdown-content">
            <NavLink exact to={`/users/${user.id}`}>Profile</NavLink>
            <NavLink onClick={onLogout} exact to={`/`}>Logout</NavLink>
          </div>
        )}
      </div>
    </>
  )

  {/* <NavLink hidden={user ? false : true} exact to='/'><img id="logout" onClick={onLogout} className='logo' alt="logo" src={user && user.profile_image_url}></img></NavLink> */ }
  // <button id='logout' hidden={user ? false : true} onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
