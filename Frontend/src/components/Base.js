import React from 'react'
import Navbar from './CustomNavbar'
import CustomNavbar from './CustomNavbar'

const Base = ({title="Welcome to website",children}) => {
  return (
    <div className='container-fluid'>
      
      {children}

    </div>
  )
}

export default Base
