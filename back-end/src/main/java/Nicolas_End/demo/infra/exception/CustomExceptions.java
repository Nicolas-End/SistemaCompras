package Nicolas_End.demo.infra.exception;


import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import Nicolas_End.demo.infra.util.model.response.ResponseUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class CustomExceptions {

    private final ResponseUtil responseUtil;

    public CustomExceptions(ResponseUtil responseUtil){
        this.responseUtil = responseUtil;
    }

    ApiResponse errorResponse;
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse> BadRequestExceptionHandler(){


        this.errorResponse = responseUtil.error("Bad Request", "Formato enviado invalido", HttpStatus.BAD_REQUEST);

        return ResponseEntity.status(errorResponse.getStatus()).body(this.errorResponse);

    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> GeneralErroException(Exception e){


        this.errorResponse = responseUtil.error("Internal Error","Erro Iterno no sistema", HttpStatus.INTERNAL_SERVER_ERROR);

        log.error("Erro: "+e.getMessage());
        return ResponseEntity.status(errorResponse.getStatus()).body(this.errorResponse);

    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity EntityNotFoundException(Exception notFoundException){
        this.errorResponse = this.responseUtil.error("Entidade enviada não encontrada no sistema", notFoundException.getMessage(), HttpStatus.NOT_FOUND);

        log.error("Erro ao Encontrar Entidade: "+notFoundException.getMessage());
        return  ResponseEntity.status(errorResponse.getStatus()).body(this.errorResponse);
    }






    

}
