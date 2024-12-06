import React, { useState } from 'react';
import './App.css';

function App() {
  const [userType, setUserType] = useState('');

  const handleLogin = (type) => {
    setUserType(type);
  };

  return (
    <div className="App">
      <h1>Welcome to SEJO</h1>
      <button onClick={() => handleLogin('employer')}>Login as Employer</button>
      <button onClick={() => handleLogin('employee')}>Login as Employee</button>

      {userType === 'employer' && <EmployerDashboard />}
      {userType === 'employee' && <EmployeeDashboard />}
    </div>
  );
}

function EmployerDashboard() {
  return <div>Employer Dashboard</div>;
}

function EmployeeDashboard() {
  return <div>Employee Dashboard</div>;
}

export default App;
