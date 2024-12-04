package com.net.app.neo4jproject.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Node("Person")
@Getter
@Setter
public class Person {
    @Id
    private String email;
    private String name;
    private String surname;
    private String phoneNumber;

    @Relationship(type="READ")
    private List<Book> read;

    public Person() {}

    public Person(String name, String surname, String email, String phoneNumber) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
