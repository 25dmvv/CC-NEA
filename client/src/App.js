/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import Signup from './components/signup';
import Login from './components/login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChatDisplay } from './components/chatDisplay';
import { ChatInput } from './components/chatInput';
import Chat from './components/Chat';

function App() {
  return (
   <Router>
    <div className="App">
    <nav className="App-nav">
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/chat">Chat</Link>
        </nav>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>      
  );
}


export default App;
