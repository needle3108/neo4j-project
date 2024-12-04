package com.net.app.neo4jproject.controller;

import com.net.app.neo4jproject.model.Book;
import com.net.app.neo4jproject.model.Person;
import com.net.app.neo4jproject.payload.request.NewBookRequest;
import com.net.app.neo4jproject.payload.request.RentRequest;
import com.net.app.neo4jproject.payload.response.MessageResponse;
import com.net.app.neo4jproject.repository.BookRepository;
import com.net.app.neo4jproject.repository.PersonRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
@CrossOrigin("http://64.226.116.227:3000")
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private PersonRepository personRepository;

    @PostMapping("/addBook")
    @Transactional
    public ResponseEntity<MessageResponse> addBook(@ModelAttribute NewBookRequest newBookRequest) {
        try{
            bookRepository.save(new Book(newBookRequest.getTitle(), newBookRequest.getAuthor(), newBookRequest.getPublisher()));

            return ResponseEntity.ok().body(new MessageResponse("Książka dodana pomyślnie"));
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Błąd podczas dodawania książki"));
        }
    }

    @GetMapping("/getBooks")
    public ResponseEntity<List<Book>> getBooks() {
        try{
            List<Book> books = bookRepository.findAll();

            return ResponseEntity.ok().body(books);
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/rentBook")
    @Transactional
    public ResponseEntity<MessageResponse> rentBook(@ModelAttribute RentRequest rentRequest) {
        try{
            Book book = bookRepository.findBookById(rentRequest.getId());
            Person person = personRepository.findPersonByEmail(rentRequest.getEmail());

            if (book.getStatus().equals("Wypożyczona")){
                return ResponseEntity.badRequest().body(new MessageResponse("Książka nie jest dostępna"));
            }

            book.getRentedBy().add(person);
            book.setStatus("Wypożyczona");

            bookRepository.save(book);

            return ResponseEntity.ok().body(new MessageResponse("Książka została wypożyczona"));
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/getPersonRentedBooks")
    public ResponseEntity<List<Book>> getPersonRentedBooks(@RequestParam String email) {
        try{
            return ResponseEntity.ok().body(bookRepository.findBooksRentedByPersonEmail(email));
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/returnBook")
    @Transactional
    public ResponseEntity<MessageResponse> returnBook(@ModelAttribute RentRequest rentRequest) {
        try{
            bookRepository.deleteRentedByRelation(rentRequest.getEmail(), rentRequest.getId());

            Book book = bookRepository.findBookById(rentRequest.getId());
            book.setStatus("Dostępna");

            Person person = personRepository.findPersonByEmail(rentRequest.getEmail());
            person.getRead().add(book);

            personRepository.save(person);

            return ResponseEntity.ok().body(new MessageResponse("Książa została zwrócona"));
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
