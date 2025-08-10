package com.denghp.englishweb.english.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.denghp.englishweb.english.model.Album;
import com.denghp.englishweb.english.model.Track;

public interface TrackRepository extends JpaRepository<Track, Long> {
        List<Track> findByAlbum(Album album);
}