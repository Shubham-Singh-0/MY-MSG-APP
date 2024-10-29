import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Body from './Components/Body';
import Chat from './Components/Chat1';
import Text from './Components/Text';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Video_Chat from './Components/Video_Chat';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/text" element={<Text />} />
        <Route path="/video" element={<Video_Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
