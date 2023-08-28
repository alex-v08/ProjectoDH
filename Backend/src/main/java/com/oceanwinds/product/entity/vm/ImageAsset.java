package com.oceanwinds.product.entity.vm;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class ImageAsset {
    private byte[] content;
    private String contentType;

    public ImageAsset(byte[] bytes, String contentType) {
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
