package Nicolas_End.demo.infra.security.filter;

public class InvalidTokenException extends RuntimeException{

    public InvalidTokenException () {
        super ("TOKEN ENVIADO PELO USUARIO INVALIDO");

    }
}
