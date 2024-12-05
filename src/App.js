import { useEffect, useState, useContext } from 'react';
import './App.scss';
import NavHeader from './components/Navigation/NavHeader';
import { Outlet } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { UserContext } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          {user && user.isAuthenticated === true &&
            <div className='app-header'>
              <NavHeader />
            </div>
          }
          <div className='app-container'>
            <AppRoutes />
          </div>
          < ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </>
      }


    </div >


  );
}

export default App;
