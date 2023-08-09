package Global.util;

import lombok.*;

import java.util.List;

@Getter@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class PaginatedResponse <T>{

    private int page;
    private int per_page;
    private long total;
    private int total_pages;
    private List<T> data;
}
