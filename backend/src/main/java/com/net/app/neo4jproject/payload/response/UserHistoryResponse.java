package com.net.app.neo4jproject.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserHistoryResponse {
    private String id;
    private String title;
    private String author;
    private String publisher;
    private String status;

    public UserHistoryResponse(String id, String title, String author, String publisher, String status) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.status = status;
    }
}
