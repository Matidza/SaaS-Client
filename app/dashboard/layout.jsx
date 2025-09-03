// app/dashboard/layout.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './navbar/NavBar';
import AuthProvider from '../providers/AuthProvider';

export const metadata = {
  title: 'Dashboard | SaaS Client',
  description: 'User dashboard area',
};

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <NavBar />
      <div className="d-flex flex-column min-vh-100">
        {children}
      </div>
    </AuthProvider>
  );
}




