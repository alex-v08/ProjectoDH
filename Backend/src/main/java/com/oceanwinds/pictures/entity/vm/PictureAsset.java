package com.oceanwinds.pictures.entity.vm;

import lombok.Data;

@Data
public class PictureAsset {
    private byte[] content;
    private String contentType;

    public PictureAsset(byte[] bytes, String contentType) {
        this.content = bytes;
        this.contentType = contentType;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
}
