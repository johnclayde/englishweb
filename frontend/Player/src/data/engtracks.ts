import {getAllSongs} from "./dataService";

export const tracks = getAllSongs(1);
console.log(tracks);
