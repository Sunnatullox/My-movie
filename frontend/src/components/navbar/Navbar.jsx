import React, { useState } from 'react'
import { ArrowDropDown, Notifications, Search } from '@material-ui/icons';
import './navbar.scss'
import AppLogo from '../../image/My_Movie-removebg-preview.png'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  window.onscroll  = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null);
  }

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"} >
      <div className="container">
        <div className="left">
          <img src={AppLogo} alt="" />
          <span>Homepage</span>
          <span>Service</span>
          <span>Movies</span>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className='icon' />
          <span>KID</span>
          <Notifications className='icon' />
          <img src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" alt="" />
          <div className="profile">
            <ArrowDropDown className='icon' />
            <div className="options">
              <span>Setting</span>
              <span>LogOut</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar