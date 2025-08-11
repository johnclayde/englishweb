package com.denghp.englishweb.english.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "enalbum")
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;


    @Column(name = "cover")
    private String cover;
    
    @Column(name = "level")
    private Integer level;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL) // fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Track> tracks;

    public List<Track> getTracks() {
        return tracks;
    }

    @Override
    public String toString() {
        return "Album{id=" + id + ", title='" + name + "'}";
    }
}