import logo from './logo.svg';
import './App.css';
import Signup from './components/signup';
import Login from './components/login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';



function App() {
  return (
   <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/signup">Signup</Link>    
        <Link to="/login">Login</Link>
        </header>
        <Routes>
          <Route path="/signup">
                <Signup />
              </Route>
             <Route path="/login">
            <Login />
          </Route> 
        </Routes>
    </div>
  </Router>  
  );
}


export default App;
