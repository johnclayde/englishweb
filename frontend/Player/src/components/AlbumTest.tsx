import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Album = {
  id: number;
  name: string;
  cover: string;
};

export const AlbumTest = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const navigate = useNavigate();

  const handleAlbumClick = (albumId: number) => {
    navigate(`/audio`);
    //update playlist
  };

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch("http://127.0.0.1:8000/enalbum")
      .then((res) => res.json())
      .then((data) => setAlbums(data))
      .catch(() => setAlbums([]));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Album List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {albums.map((album) => (
          <div key={album.id}
               onClick={() => handleAlbumClick(album.id)}
               className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4">
            <img
              src={`http://127.0.0.1:8000/${album.cover}`}
              alt={album.name}
              className="w-32 h-32 object-cover rounded mb-4"
            />
            <div className="text-lg font-semibold text-gray-700 mb-2">ID: {album.id}</div>
            <div className="text-md text-gray-600">{album.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};