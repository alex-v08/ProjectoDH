package com.oceanwinds.mail.controller;
import com.oceanwinds.mail.request.EmailRequest;
import com.oceanwinds.mail.service.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin("*")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;



    @PostMapping("/send")
    public String sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            emailService.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
            return "Email sent successfully!";
        } catch (Exception e) {
            return "Failed to send email: " + e.getMessage();
        }
    }
    @PostMapping("/send-html")
    @ResponseBody
    public String sendHtmlEmail(@RequestBody EmailRequest emailRequest) {
        try {
            String to = emailRequest.getTo();
            String subject = emailRequest.getSubject();
            String htmlContent = emailRequest.getHtmlContent();

            emailService.sendHtmlEmail(to, subject, htmlContent);

            return "Email sent successfully!";
        } catch (MessagingException e) {
            return "Failed to send email: " + e.getMessage();
        }
    }
}
