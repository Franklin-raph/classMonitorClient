import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import About from './pages/About';
import Home from './pages/Home';
import StudentDetails from './pages/StudentDetails';
import AllStudents from './pages/AllStudents';
import AccountUpdate from './pages/AccountUpdate';
import Navbar from './components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProfilePicUpload from './pages/ProfilePicUpload';
import ResetPassowrd from './pages/ResetPassowrd';
import ForgotPassword from './pages/ForgotPassword';
import TaskDetails from './pages/TaskDetails'
import PageNotFound_404 from './pages/PageNotFound_404';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Poppins',
      textTransform: 'none',
      fontSize: 16,
    },
  },
});

function App() {


  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
            <Routes>
              <Route path='/dashboard' element={ <Dashboard /> } />
              <Route path='/login' element={ <Signin /> } />
              <Route path='/signup' element={ <Signup /> } />
              <Route path='/about' element={ <About /> } />
              <Route path='/' element={ <Home /> } />
              <Route path='/update' element={ <AccountUpdate /> } />
              <Route path='/allstudents' element={ <AllStudents /> } />
              <Route path='/student/:id' element={ <StudentDetails /> } />
              <Route path='/forgotpassword' element={<ForgotPassword /> } />
              <Route path='/taskdetails/:taskID' element={ <TaskDetails /> } />
              <Route path='/profilepicupload/:id' element={ <ProfilePicUpload /> } />
              <Route path='/student/resetpassword/:student_id/:token' element={ <ResetPassowrd />} />
              <Route path='*' element={ <PageNotFound_404 /> } />
            </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
