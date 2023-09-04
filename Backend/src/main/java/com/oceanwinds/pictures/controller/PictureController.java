
package com.oceanwinds.pictures.controller;
import com.oceanwinds.pictures.service.S3Service;

import com.oceanwinds.pictures.entity.vm.PictureAsset;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/pictures")
@CrossOrigin(origins = "*")
public class PictureController {


    private final S3Service s3Service;
    @Autowired
    public PictureController(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @PostMapping("/upload")

    Map<String, String> upload(@RequestParam MultipartFile file) {
        String key = s3Service.putObject(file);

        Map<String, String> result = new HashMap<>();
        result.put("imageKey", key);
        result.put("imageUrl", s3Service.getObjectUrl(key));

        return result;
    }

    @GetMapping(value = "/get-img", params = "key")
    ResponseEntity<ByteArrayResource> getObject(@RequestParam String key) {
        PictureAsset pictureAsset = s3Service.getObject(key);
        ByteArrayResource resource = new ByteArrayResource(pictureAsset.getContent());

        return ResponseEntity
                .ok()
                .header("Content-Type", pictureAsset.getContentType())
                .contentLength(pictureAsset.getContent().length)
                .body(resource);
    }

    @DeleteMapping(value = "/delete",params = "key")
    void deleteObject(@RequestParam String key){
        s3Service.deleteObject(key);
    }
}
