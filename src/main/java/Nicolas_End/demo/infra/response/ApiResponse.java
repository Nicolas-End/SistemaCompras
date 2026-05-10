package Nicolas_End.demo.infra.response;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ApiResponse<T> {
    private boolean sucess;
    private String message;
    private T datas;
    private String error;
    private LocalDateTime time; // Mostra quando gerou a resposta
    private String path;
    private HttpStatus status;//Endpoint-utilizado


    public boolean getSucess(){
        return  this.sucess;
    }
}
