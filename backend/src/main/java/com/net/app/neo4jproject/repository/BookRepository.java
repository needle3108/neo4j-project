package com.net.app.neo4jproject.repository;

import com.net.app.neo4jproject.model.Book;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface BookRepository extends Neo4jRepository<Book, String> {
    @Query("MATCH (b:Book {id: $id}) RETURN b")
    Book findBookById(String id);

    @Query("MATCH (p:Person {email: $email})-[:READ]->(b:Book) RETURN b")
    List<Book> findBooksReadByPersonEmail(String email);

    @Query("MATCH (b:Book)-[:RENTED_BY]->(p:Person {email: $email}) RETURN b")
    List<Book> findBooksRentedByPersonEmail(String email);

    @Query("MATCH (b:Book {id: $bookId})-[r:RENTED_BY]->(p:Person {email: $email}) DELETE r")
    void deleteRentedByRelation(String email, String bookId);
}
