package com.net.app.neo4jproject.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewBookRequest {
    private String title;
    private String author;
    private String publisher;

    public NewBookRequest(String title, String author, String publisher) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
    }
}
