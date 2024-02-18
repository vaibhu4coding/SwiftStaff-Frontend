import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import LoginPage from './Pages/LoginPage/LoginPage';
import ProjectTrackPage from './Pages/ProjectTrackPage/ProjectTrackPage';
import EmployeeListPage from './Pages/EmployeeListPage/EmployeeListPage';
import AttendanceTrackPage from './Pages/AttendanceTrackPage';
import PrivateRoute from './components/PrivateRoute';
import ErrorPage from './Pages/ErrorPage';
import EmployeeFormPage from './Pages/EmployeeFormPage/EmployeeFormPage';
import ProjectForm from './Pages/ProjectForm/ProjectForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage></LoginPage>}></Route>
        <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/projects' element={<ProjectTrackPage></ProjectTrackPage>}></Route>
          <Route path='/employees' element={<EmployeeListPage></EmployeeListPage>}></Route>
          <Route path='/attendance' element={<AttendanceTrackPage></AttendanceTrackPage>}></Route>
          <Route path='/create-employee' element={<EmployeeFormPage></EmployeeFormPage>}></Route>
          <Route path='/create-project' element={<ProjectForm></ProjectForm>}></Route>
        </Route>
        <Route path='*' element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
