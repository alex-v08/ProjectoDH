package Global.dto;

import org.springframework.http.HttpStatus;

public class MessageDto {

    private HttpStatus status;
    private String message;

    private Object data;


    public MessageDto(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public MessageDto(HttpStatus status, String message, Object data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public MessageDto(String message) {
        this.message = message;
    }

    public MessageDto() {
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }



}


