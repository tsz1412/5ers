import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import YourStocks from './components/YourStocks';
import SingleStock from './components/SingleStock';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from './stores/authStore';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const App = observer(() => {
  const authStore = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        
        {/* Protected routes for dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<YourStocks />} />
          <Route path="stock/:symbol" element={<SingleStock />} />
        </Route>
      </Routes>
    </Router>
  );
});

export default App;
