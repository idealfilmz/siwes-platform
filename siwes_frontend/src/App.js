import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Register } from './Authenications/Register';
import { Notfound } from './notfound';
import { LecturerOverview } from './componet/supervisor/dashboard';
import { LecturerDashboard } from './componet/supervisor/landin';
import { StudentDashboard } from './componet/students/dashboard';
import BottomNav from './bottom/bottomnav';
import NewPage from './bottom/NewPage';
import { MultiLevelSidebar } from './dashboards';
import { WeekLyName } from './students/weeklyprogress';
import { SupervisorBar } from './componet/supervisor/supervisorbar';
import { LandingPage } from './landingpage';
import { SupLogin } from './supervisor_login';
import { Login } from './Authenications/login';
import { SignUp } from './supervisor_login/supervisorSignUp';

function App() {
  return (

    <Router>
      <div>
        <Routes>
<Route path='/landing' element={<LandingPage/>} />
 <Route path="/" element={<Register />} />
          <Route path="nav" element={<BottomNav />} />
          <Route path="/newpage" element={<NewPage />} />
          <Route path ="login" element={< SupLogin/>} />
          <Route path ="SignUp" element={< SignUp/>} />
          <Route path="supervisor-login" element={<Login />} />
          <Route path='/supervisor' element={<SupervisorBar />} >
            <Route path="view" element={<LecturerOverview />} />
            <Route path="LecturerDashboard" element={<LecturerDashboard />} />
          </Route>
          <Route path="*" element={<Notfound />} />
          <Route path='/side' element={<MultiLevelSidebar />} >
            <Route path="StudentDashboard" element={<StudentDashboard />} />
            <Route path='wekk' element={<WeekLyName />} />
          </Route>
        </Routes>
     
      </div>
    </Router>

  );
}

export default App;
