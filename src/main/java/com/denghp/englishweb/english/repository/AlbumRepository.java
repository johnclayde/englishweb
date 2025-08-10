package com.denghp.englishweb.english.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.denghp.englishweb.english.model.Album;


public interface AlbumRepository extends JpaRepository<Album,Long> {
    List<Album> findAll();
}