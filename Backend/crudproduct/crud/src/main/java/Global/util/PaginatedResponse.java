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

    public void setPage(int i) {
    }

    public void setPer_page(int size) {
    }

    public void setTotal(long totalElements) {
    }

    public int getPage() {
        return page;
    }

    public int getPer_page() {
        return per_page;
    }

    public long getTotal() {
        return total;
    }

    public int getTotal_pages() {
        return total_pages;
    }

    public void setTotal_pages(int total_pages) {
        this.total_pages = total_pages;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }
}
