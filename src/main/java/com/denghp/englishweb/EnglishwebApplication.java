package com.denghp.englishweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class EnglishwebApplication {

	public static void main(String[] args) {
		SpringApplication.run(EnglishwebApplication.class, args);
	}

    @GetMapping("/hello_a")
    public String hello() {
        return "Hello, boy!";
    }

}
