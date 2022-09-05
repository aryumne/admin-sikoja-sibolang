import React, { useRef, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './configs/routes';
function App() {
  const defaultTitle = useRef(document.title);
  const title = localStorage.getItem('role')

  useEffect(() => {
    document.title = title ? title == 1 ? 'Dashboard Superadmin' : title == 2 ? ' Dashboard Pengelola' : 'Dashboard Instansi' : defaultTitle.current;
  }, [title]);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
