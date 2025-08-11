import DashboardShell from './components/DashboardShell';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Dashboard | SaaS Client',
  description: 'User dashboard area',
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DashboardShell>
          {children}
        </DashboardShell>
      </body>
    </html>
  );
}




