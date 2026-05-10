package Nicolas_End.demo.infra.exception;


import Nicolas_End.demo.infra.response.ApiResponse;
import Nicolas_End.demo.infra.response.ResponseUtil;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class CustomExceptions {

    ApiResponse errorResponse;

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse> BadRequestExceptionHandler(HttpServletRequest request){

        String path = String.valueOf(request.getRequestURL());

        this.errorResponse = ResponseUtil.error("Bad Request", "Formato enviado invalido", path, HttpStatus.BAD_REQUEST);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(this.errorResponse);

    }

    

}
