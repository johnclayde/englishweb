package com.denghp.englishweb.english.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.denghp.englishweb.english.model.Track;
import com.denghp.englishweb.english.model.Album;
import com.denghp.englishweb.english.repository.TrackRepository;
import com.denghp.englishweb.english.repository.AlbumRepository;

@Service
public class TrackService {
    private final TrackRepository trackRepository;
    private final AlbumRepository albumRepository;

    @Autowired
    public TrackService(TrackRepository trackRepository, AlbumRepository albumRepository) {
        this.trackRepository = trackRepository;
        this.albumRepository = albumRepository;
    }

    public List<Track> getTracksByAlbumId(Long albumId) {
        Album album = albumRepository.findById(albumId).orElse(null);
        if (album == null) {
            return List.of();
        }
        return trackRepository.findByAlbum(album);
    }
}
