import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Login from '@/components/ui/login';
import Dashboard from '@/components/ui/dashboard';
import Register from '@/components/ui/register';
import TenantForm from '@/components/ui/tenant-form';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
}

function App() {

  return (<AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tenant/new"
          element={
            <ProtectedRoute>
              <TenantForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tenant/edit/:id"
          element={
            <ProtectedRoute>
              <TenantForm />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  </AuthProvider>);
}

export default App
