

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import  { AudioPlayer } from './components/AudioPlayer';
import {AlbumPage } from './components/Album';
import { Navbar } from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Navbar />
        <main className="p-4 flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/album" />} />
            <Route
              path="/audio"
              element={
                <div className="flex justify-center items-center h-full"><AudioPlayer /></div>
              } />
            <Route path="/album" element={<AlbumPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 