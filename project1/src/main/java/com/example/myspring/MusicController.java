package com.example.myspring;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class MusicController {

    private static final Logger logger = LoggerFactory.getLogger(MusicController.class);

    @CrossOrigin(origins = "*")
    @GetMapping("/list-music-files")
    public List<String> getMusicFiles() throws IOException {
        Resource resource = new ClassPathResource("static/music");
        File musicDir = resource.getFile();
        logger.info("Music directory path: {}", musicDir.getAbsolutePath());

        File[] files = musicDir.listFiles((dir, name) -> name.endsWith(".mp3"));

        if (files != null) {
            List<String> fileNames = Arrays.stream(files)
                                           .map(File::getName)
                                           .collect(Collectors.toList());
            logger.info("Found files: {}", fileNames);
            return fileNames;
        } else {
            logger.warn("No files found in directory");
            return List.of();
        }
    }
}
