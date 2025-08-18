
import {  BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Pdfs from './Pdfs';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pdfs" element={<Pdfs />} />
      </Routes>
    </Router>
  )
}

export default App;
