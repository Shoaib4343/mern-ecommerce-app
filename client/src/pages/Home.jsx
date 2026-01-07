import React, { useContext } from 'react'
import { AuthContext, useAuth } from '../context/AuthContext'

const Home = () => {
  const {auth, setAuth} = useAuth();
  return (
    <div>
      <h1>
        {
          JSON.stringify(auth, null, 4)
        }
      </h1>
    </div>
  )
}

export default Home