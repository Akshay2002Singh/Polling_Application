import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from './components/LoginUser';
import SignupUser from './components/SignupUser';
import CreatePoll from './components/CreatePoll';
import Home from './components/Home';
import MyPolls from './components/MyPolls';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginUser />} />
        <Route path="signup" element={<SignupUser />} />
        <Route path="createPoll" element={<CreatePoll />} />
        <Route path="myPolls" element={<MyPolls />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
