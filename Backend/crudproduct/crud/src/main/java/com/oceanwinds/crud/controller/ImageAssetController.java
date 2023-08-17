package com.oceanwinds.crud.controller;

import com.oceanwinds.crud.entity.vm.ImageAsset;
import com.oceanwinds.crud.service.S3Service;
import org.apache.http.util.ByteArrayBuffer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/assets")
public class ImageAssetController {

    @Autowired
    private S3Service s3Service;

    @PostMapping("/upload")
    Map<String, String> upload(@RequestParam MultipartFile file) {
        String key = s3Service.putObject(file);

        Map<String, String> result = new HashMap<>();
        result.put("key", key);
        result.put("url", s3Service.getObjectUrl(key));

        return result;
    }

    @GetMapping(value = "/get-img", params = "key")
    ResponseEntity<ByteArrayResource> getObject(@RequestParam String key) {
        ImageAsset imageAsset = s3Service.getObject(key);
        ByteArrayResource resource = new ByteArrayResource(imageAsset.getContent());

        return ResponseEntity
                .ok()
                .header("Content-Type", imageAsset.getContentType())
                .contentLength(imageAsset.getContent().length)
                .body(resource);
    }

    @DeleteMapping(value = "/delete",params = "key")
    void deleteObject(@RequestParam String key){
        s3Service.deleteObject(key);
    }
}
