package com.denghp.englishweb.english.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.denghp.englishweb.english.model.Track;
import com.denghp.englishweb.english.service.TrackService;
import com.denghp.englishweb.english.repository.TrackRepository;

@RestController
@RequestMapping("/enalbum/{albumId}/track")
public class TrackController {
    private final TrackService trackService;
    private final TrackRepository trackRepository;

    @Autowired
    public TrackController(TrackService trackService, TrackRepository trackRepository) {
        this.trackService = trackService;
        this.trackRepository = trackRepository;
    }

    @GetMapping("")
    public List<Track> getTracksByAlbum(@PathVariable("albumId") Long albumId) {
        return trackService.getTracksByAlbumId(albumId);
    }

    @GetMapping("/{trackId}")
    public Track getTrackById(@PathVariable("trackId") Long trackId) {
        return trackRepository.findById(trackId).orElse(null);
    }
}
