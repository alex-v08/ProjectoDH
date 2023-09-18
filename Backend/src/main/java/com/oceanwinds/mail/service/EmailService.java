package com.oceanwinds.mail.service;

import com.oceanwinds.mail.entity.EmailTracker;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import lombok.Data;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@Data

public class EmailService {

    private final JavaMailSender javaMailSender;

    private EmailTracker emailTracker;




    public void sendEmail(String to, String subject, String body) {
        if (!emailTracker.hasEmailSentRecently(to)) {
            emailTracker.markEmailSent(to);
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            javaMailSender.send(message);
        }

    }
    public void sendHtmlEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        javaMailSender.send(message);
    }

}
