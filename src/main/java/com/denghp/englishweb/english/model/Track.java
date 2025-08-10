package com.denghp.englishweb.english.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "entrack")
public class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "src")
    private String src;

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "scripts")
    private String scripts;

    @ManyToOne
    @JoinColumn(name = "album_id")
    @JsonBackReference
    private Album album;

    @Override
    public String toString() {
        return "Track{id=" + id + ", title='" + title + "', src='" + src + "'}";
    }
}