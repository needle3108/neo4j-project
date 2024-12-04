package com.net.app.neo4jproject.repository;

import com.net.app.neo4jproject.model.Person;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

public interface PersonRepository extends Neo4jRepository<Person, String> {
    @Query("MATCH (p:Person {email: $email}) RETURN p")
    Person findPersonByEmail(String email);
}
