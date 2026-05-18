package Nicolas_End.demo.infra.security;

import Nicolas_End.demo.domains.staff.StaffEntity;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;


import jakarta.annotation.PostConstruct;
import org.antlr.v4.runtime.Token;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;


@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;


    public String generateToken(StaffEntity staff){
        try{
            validateSecret();
            Algorithm algorithm = Algorithm.HMAC256(this.secret);
            return JWT.create()
                    .withIssuer("auth-api")
                    .withSubject(staff.getEmail())
                    .withExpiresAt(genExpirationDate())
                    .sign(algorithm);




        }catch (JWTCreationException exception){

            throw new RuntimeException("Error enquanto gerava o token: ",exception);
        }
    }

    public String validateToken(String token){
        try{
            validateSecret();
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("auth-api")
                    .build()
                    .verify(token)
                    .getSubject();
        }catch (JWTVerificationException exception){
            return "";
        }
    }

    private Instant genExpirationDate(){

        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-3"));
    }


    @PostConstruct
    private void validateSecret(){
        if (secret == null){

            throw  new RuntimeException("A variavel secret não esta configurada");
        }

    }

}
