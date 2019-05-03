import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

function App() {
  return (
   <div>
     <Navbar/>
     <Landing/>
     <Footer/>
   </div>
  );
}

export default App;
