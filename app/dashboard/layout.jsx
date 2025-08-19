import DashboardShell from './components/DashboardShell';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './navbar/NavBar';
import AuthProvider from "../providers/AuthProvider";

export const metadata = {
  title: 'Dashboard | SaaS Client',
  description: 'User dashboard area',
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
	<AuthProvider>
        <NavBar />
        {children}
	 </AuthProvider>
      </body>
    </html>
  );
}




