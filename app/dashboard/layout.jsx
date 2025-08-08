// app/dashboard/layout.jsx
// Import the client wrapper
import DashboardProviderWrapper from './provider-wrapper'; // ⬅️ create this file next
import 'bootstrap/dist/css/bootstrap.min.css';


export const metadata = {
  title: 'Dashboard | SaaS Client',
  description: 'User dashboard area',
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap with a Client Component */}
        <DashboardProviderWrapper>
          {children}
        </DashboardProviderWrapper>
      </body>
    </html>
  );
}



