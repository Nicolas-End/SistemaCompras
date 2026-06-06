package Nicolas_End.demo.infra.exception;

import org.springframework.security.core.AuthenticationException;

public class ExpiredTokenException extends AuthenticationException {

    public ExpiredTokenException () {
        super ("TOKEN ENVIADO PELO USUARIO INVALIDO");

    }
}
