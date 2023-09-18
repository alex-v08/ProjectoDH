package com.oceanwinds.mail.entity;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class EmailTracker {
    private Map<String, LocalDateTime> emailSentTimeMap = new HashMap<>();

    public void markEmailSent(String email) {
        emailSentTimeMap.put(email, LocalDateTime.now());
    }

    public Boolean hasEmailSentRecently(String email){
        LocalDateTime lastSentTime = emailSentTimeMap.get(email);
        if (lastSentTime == null) {
            return false;
        }
        LocalDateTime twentyFourHoursAgo = LocalDateTime.now().minusHours(24);
        return lastSentTime.isAfter(twentyFourHoursAgo);
    }
}
