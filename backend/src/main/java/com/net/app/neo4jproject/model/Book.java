package com.net.app.neo4jproject.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

import java.util.List;

@Node("Book")
@Getter
@Setter
public class Book {
    @Id
    @GeneratedValue(UUIDStringGenerator.class)
    private String id;
    private String title;
    private String author;
    private String publisher;
    private String status;

    @Relationship(type="RENTED_BY")
    private List<Person> rentedBy;

    public Book() {}

    public Book(String title, String author, String publisher) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.status = "Dostępna";
    }
}
