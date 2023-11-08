import { Outlet, useLocation } from 'react-router-dom';
import './index.css';
import { excludeList } from './white-list';

export default function MainLayout() {
  const location = useLocation();
  const pathname = location.pathname;
  if (excludeList.includes(pathname)) {
    return <Outlet />;
  }
  return (
    <div className="main-layout">
      main layout
      <Outlet />
    </div>
  );
}
