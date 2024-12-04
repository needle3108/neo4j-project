package com.net.app.neo4jproject;

import org.neo4j.cypherdsl.core.renderer.Dialect;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Neo4jConfigurator {
    @Bean
    org.neo4j.cypherdsl.core.renderer.Configuration cypherDslConfiguration(){
        return org.neo4j.cypherdsl.core.renderer.Configuration.newConfig()
                .withDialect(Dialect.NEO4J_5).build();
    }
}
