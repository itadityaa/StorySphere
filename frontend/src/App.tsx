import React from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'

const App = () => {
  return (
    <>
      <nav>Navbar</nav>
      <div>
        <Outlet />
      </div>
      <footer>Footer</footer>
    </>
  )
}

export default App
