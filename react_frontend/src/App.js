import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from './components/LoginUser';
import SignupUser from './components/SignupUser';
import NavBar from './components/NavBar';
import CreatePoll from './components/CreatePoll';
import Home from './components/Home';

function App() {
  return (
    <>
      {/* <NavBar /> */}
      {/* <LoginUser /> */}
      {/* <SignupUser /> */}
      {/* <CreatePoll /> */}
      <Home />
    </>
  );
}

export default App;
