package com.net.app.neo4jproject.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RentRequest {
    private String email;
    private String id;

    public RentRequest(String email, String id) {
        this.email = email;
        this.id = id;
    }
}
