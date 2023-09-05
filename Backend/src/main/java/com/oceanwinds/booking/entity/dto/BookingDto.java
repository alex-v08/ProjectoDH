package com.oceanwinds.booking.entity.dto;


import lombok.*;

import java.time.LocalDate;

@Setter@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingDto {
    private Long user_id;
    private Long product_id;
    private LocalDate dateInit;
    private LocalDate dateEnd;

}
