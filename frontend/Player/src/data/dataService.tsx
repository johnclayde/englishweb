// src/services/dataService.ts
import apiClient from "./http-common";
import type { Track }  from "./data_type";

const findAll = async (id: number): Promise<Track[]> => {
    const response = await apiClient.get<Track[]>(`/enalbum/${id}/track`);
    return response.data;
};

const findById = async (id: number): Promise<Track> => {
    const response = await apiClient.get<Track>(`/enalbum/1/track/${id}`);
    return response.data;
};


export const getAllSongs = async (id?: number): Promise<Track[]> => {
  if (!id) {
    console.error("getAllSongs: album ID is missing");
    return [];
  }
  
  try {
    const songs = await findAll(id);
    const baseUrl = "http://127.0.0.1:8000/";
    const updatedSongs = songs.map(song => ({
      ...song,
      src: song.src ? baseUrl + song.src : song.src,
      thumbnail: song.thumbnail ? baseUrl + song.thumbnail : song.thumbnail,
      scripts: song.scripts ? baseUrl + song.scripts : song.scripts,
    }));
    console.log(updatedSongs);
    return updatedSongs;
  } catch (error) {
    console.error("Failed to fetch songs:", error);
    return [];
  }
};

