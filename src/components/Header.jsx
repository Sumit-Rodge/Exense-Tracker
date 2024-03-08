import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='pl-4 h-10 flex items-center *:px-4 bg-gray-500  text-white font-mono'>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
    </div>
  )
}
