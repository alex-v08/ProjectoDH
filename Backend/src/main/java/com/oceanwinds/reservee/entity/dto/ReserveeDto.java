package com.oceanwinds.reservee.entity.dto;


import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Setter@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReserveeDto {
    private Long user_id;
    private Long product_id;
    private LocalDate dateInit;
    private LocalDate dateEnd;


}
