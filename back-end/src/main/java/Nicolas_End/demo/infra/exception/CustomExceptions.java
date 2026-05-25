package Nicolas_End.demo.infra.exception;


import Nicolas_End.demo.infra.util.response.ApiResponse;
import Nicolas_End.demo.infra.util.response.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import jakarta.servlet.http.HttpServletRequest;

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

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(this.errorResponse);

    }


    

}
