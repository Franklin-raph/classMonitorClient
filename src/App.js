import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/signin' element={ <Signin /> } />
          <Route path='/signup' element={ <Signup /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
