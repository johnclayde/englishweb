/* 
import { AudioPlayer } from './components/AudioPlayer';
import {AlbumTest } from './components/AlbumTest';

function App() {
  return (
    <div 
      className="h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-5">
        AII Player
      </h1>
        <AudioPlayer /> 
    </div>
  );
}

export default App;

*/

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import  { AudioPlayer } from './components/AudioPlayer';
import {AlbumTest } from './components/AlbumTest';
import { Navbar } from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/album" />} />
            <Route path="/audio" element={<AudioPlayer />} />
            <Route path="/album" element={<AlbumTest />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 