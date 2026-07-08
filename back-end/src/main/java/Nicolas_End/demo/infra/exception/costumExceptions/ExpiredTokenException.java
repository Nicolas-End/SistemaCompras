package Nicolas_End.demo.infra.exception.costumExceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;

@Slf4j
public class ExpiredTokenException extends AuthenticationException {

    public ExpiredTokenException () {

        super ("TOKEN ENVIADO PELO USUARIO INVALIDO");
        log.error("User's token is invalid ou expired");

    }
}
