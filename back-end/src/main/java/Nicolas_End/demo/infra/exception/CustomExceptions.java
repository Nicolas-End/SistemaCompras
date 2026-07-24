package Nicolas_End.demo.infra.exception;


import Nicolas_End.demo.infra.exception.costumExceptions.DataLimitLenghtException;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import Nicolas_End.demo.infra.util.model.response.ResponseUtil;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.UnexpectedTypeException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
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
    public ResponseEntity<ApiResponse> BadRequestExceptionHandler(Exception badRequest){


        this.errorResponse = responseUtil.error("Bad Request", badRequest.getMessage() , HttpStatus.BAD_REQUEST);

        return ResponseEntity.status(errorResponse.getStatus()).body(this.errorResponse);

    }

    @ExceptionHandler(UnexpectedTypeException.class)
    public ResponseEntity<ApiResponse> InvalidInputType(Exception badRequest){


        this.errorResponse = responseUtil.error("Bad Request", badRequest.getMessage() , HttpStatus.BAD_REQUEST);

        return ResponseEntity.status(errorResponse.getStatus()).body(this.errorResponse);

    }

    @ExceptionHandler(DataLimitLenghtException.class)
    public ResponseEntity DataLimitLenghtExceptionHandler(Exception dataException){
        this.errorResponse = responseUtil.error("Bad Request", dataException.getMessage() , HttpStatus.BAD_REQUEST);

        return ResponseEntity.status(errorResponse.getStatus()).body(this.errorResponse);

    }


    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiResponse> MethodNotSupportedException(){
        this.errorResponse = responseUtil.error("Requested Method Not Supported","Endpoint enviado não suporta este metodo", HttpStatus.METHOD_NOT_ALLOWED);

        return ResponseEntity.status(errorResponse.getStatus()).body(this.errorResponse);

    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> GeneralErroException(Exception e){


        this.errorResponse = responseUtil.error("Internal Error","Erro Iterno no sistema", HttpStatus.INTERNAL_SERVER_ERROR);

        log.error("Exception: "+e);
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
