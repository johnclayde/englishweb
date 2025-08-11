package com.denghp.englishweb.english.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.denghp.englishweb.english.model.Album;
import com.denghp.englishweb.english.service.AlbumService;
import com.denghp.englishweb.english.repository.AlbumRepository;

@RestController
@RequestMapping("/enalbum")
public class AlbumController {
    private final AlbumService albumService;
    private final AlbumRepository albumRepository;

    @Autowired
    public AlbumController(AlbumService albumService, AlbumRepository albumRepository) {
        this.albumService = albumService;
        this.albumRepository = albumRepository;
    }

    @GetMapping("")
    public List<Album> getAllAlbums() {
        return albumService.getAllAlbums();
    }

    @GetMapping("/{id}")
    public Album getAlbumById(@PathVariable Long id) {
        return albumRepository.findById(id).orElse(null);
    }
}
