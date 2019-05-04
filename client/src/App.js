import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <Router>
      <div>
       <Navbar/>
       <Route exact path="/" component={Landing} />
       <div className="container">
         <Route exact path='/register' component={Register}/>
         <Route exact path='/login' component={Login}/>
       </div>
       <Footer/>
      </div>
    </Router>
  );
}

export default App;
