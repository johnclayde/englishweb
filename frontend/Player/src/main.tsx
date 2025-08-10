
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import './styles/index.css';
import App from './App.tsx';
import { AudioProvider } from './context/AudioContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AudioProvider>
      <App />
    </AudioProvider>
  </React.StrictMode>
);

/*
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AudioPlayer } from './components/AudioPlayer';
import { AlbumTest } from './temp/AlbumTest.tsx';
import { AudioProvider } from './context/AudioContext.tsx';

const App = () => {
  const [view, setView] = useState<'english' | 'album'>('english');

  return (
    <div>
      <nav className="bg-gray-800 px-4 py-3 flex justify-center gap-4">
        <button
          onClick={() => setView('english')}
          className={`text-sm px-3 py-1 rounded ${view === 'english' ? 'bg-gray-600' : ''}`}
        >
          English
        </button>
        <button
          onClick={() => setView('album')}
          className={`text-sm px-3 py-1 rounded ${view === 'album' ? 'bg-gray-600' : ''}`}
        >
          Album
        </button>
      </nav>

      <div className="p-4">
        {view === 'english' && <AudioProvider> <App /> </AudioProvider>
        }
        {view === 'album' && <AlbumTest />}
      </div>
    </div>
  );
};
*/
/*
ReactDOM.createRoot(document.getElementById('root')!).render(<App />); */