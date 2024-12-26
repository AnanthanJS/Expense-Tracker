import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Profile from './components/Pages/Profile';
import ExpenseManager from './components/ExpenseManager';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="expenses" element={<ExpenseManager />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
