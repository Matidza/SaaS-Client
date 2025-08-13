import DashboardShell from './components/DashboardShell';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './navbar/NavBar';


export const metadata = {
  title: 'Dashboard | SaaS Client',
  description: 'User dashboard area',
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
	  <NavBar />
          {children}
        
      </body>
    </html>
  );
}




