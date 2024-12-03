import { useEffect, useState, useContext } from 'react';
import './App.scss';
import Nav from './components/Navigation/Nav';
import { Outlet } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { UserContext } from './context/UserContext';

import { RevolvingDot } from 'react-loader-spinner'

function App() {
  const { user } = useContext(UserContext);
  return (
    <div className='App' >
      {user && user.isLoading ?
        <div className='loading-container'>
          <RevolvingDot
            visible={true}
            height="50"
            width="50"
            color="#4fa94d"
            ariaLabel="revolving-dot-loading"
            wrapperStyle={{}}
            wrapperClass=""
            strokeWidth="5"

          />
          <div className='loading-cotent'>
            Loading data...
          </div>
        </div>

        :
        <>
          <div className='app-header'>
            <Nav />
          </div>

          <div className='app-container'>
            <AppRoutes />
          </div>
        </>
      }


    </div >


  );
}

export default App;
