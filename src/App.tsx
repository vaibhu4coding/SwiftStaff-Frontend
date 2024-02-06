import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage/LoginPage';
import ProjectTrackPage from './Pages/ProjectTrackPage';
import EmployeeListPage from './Pages/EmployeeListPage';
import AttendanceTrackPage from './Pages/AttendanceTrackPage';
import PrivateRoute from './components/PrivateRoute';
import ErrorPage from './Pages/ErrorPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage></LoginPage>}></Route>
        <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/project-track' element={<ProjectTrackPage></ProjectTrackPage>}></Route>
          <Route path='/employees' element={<EmployeeListPage></EmployeeListPage>}></Route>
          <Route path='/attendance' element={<AttendanceTrackPage></AttendanceTrackPage>}></Route>
        </Route>
        <Route path='*' element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
