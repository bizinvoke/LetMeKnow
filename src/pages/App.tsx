import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home', { replace: true });
    }
  }, [location.pathname]);

  return (
    <div id="App">
      <Outlet />
    </div>
  );
}

export default App;
