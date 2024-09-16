import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Login } from './supervisor_login';
import { Register } from './Authenications/Register';
import { Notfound } from './notfound';
import { LecturerOverview } from './componet/supervisor/dashboard';
import { LecturerDashboard } from './componet/supervisor/landin';
import { StudentDashboard } from './componet/students/dashboard';
import BottomNav from './bottom/bottomnav';
import { MultiLevelSidebar } from './dashboards';
import { WeekLyName } from './students/weeklyprogress';

function App() {
  return (

    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lecturer-overview" element={<LecturerOverview />} />
          <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
          <Route path="*" element={<Notfound />} />
          <Route path='/side' element={<MultiLevelSidebar />} >
            <Route path="" element={<StudentDashboard />} />
            <Route path='wekk' element={<WeekLyName />} />
          </Route>




        </Routes>
        <BottomNav />
      </div>
    </Router>

  );
}

export default App;
