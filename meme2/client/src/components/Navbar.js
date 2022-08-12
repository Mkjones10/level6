import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar(props) {
  const { logout } = props
  return (
    <div className="navbar">
      <div className="nav-head">
        Meme <span className='navspan'> Creator</span>
      </div>
      <div className="nav-links">
        <Link to="/profile">Profile</Link>
        <Link to="/public">Public</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}