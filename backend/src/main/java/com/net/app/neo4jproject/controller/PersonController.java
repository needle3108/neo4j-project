package com.net.app.neo4jproject.controller;

import com.net.app.neo4jproject.model.Book;
import com.net.app.neo4jproject.model.Person;
import com.net.app.neo4jproject.payload.request.NewUserRequest;
import com.net.app.neo4jproject.payload.response.MessageResponse;
import com.net.app.neo4jproject.payload.response.UserHistoryResponse;
import com.net.app.neo4jproject.repository.BookRepository;
import com.net.app.neo4jproject.repository.PersonRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/person")
@CrossOrigin("http://64.226.116.227:3000")
public class PersonController {
    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private BookRepository bookRepository;

    @PostMapping("/addUser")
    @Transactional
    public ResponseEntity<MessageResponse> addUser(@ModelAttribute NewUserRequest newUserRequest) {
        try{
            List<Person> persons = personRepository.findAll();

            for(Person person : persons){
                if(person.getEmail().equals(newUserRequest.getEmail())){
                    return ResponseEntity.badRequest().body(new MessageResponse("Użytkownik o danym adresie email już istnieje"));
                }
            }

            personRepository.save(new Person(newUserRequest.getName(), newUserRequest.getSurname(), newUserRequest.getEmail(), newUserRequest.getPhoneNumber()));

            return ResponseEntity.ok().body(new MessageResponse("Użytownik dodany pomyślnie"));
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Błąd podczas dodawania użytkownika"));
        }
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<Person>> getUsers() {
        try{
            List<Person> users = personRepository.findAll();
            return ResponseEntity.ok().body(users);
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/userHistory")
    public ResponseEntity<List<UserHistoryResponse>> userHistory(@RequestParam String email) {
        try{
            List<UserHistoryResponse> response = new ArrayList<>();

           for (Book book : bookRepository.findBooksReadByPersonEmail(email)) {
               response.add(new UserHistoryResponse(book.getId(), book.getTitle(), book.getAuthor(), book.getPublisher(), "Przeczytana"));
           }

           for (Book book : bookRepository.findBooksRentedByPersonEmail(email)) {
               response.add(new UserHistoryResponse(book.getId(), book.getTitle(), book.getAuthor(), book.getPublisher(), "Wypożyczona"));
           }

            return ResponseEntity.ok().body(response);
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
