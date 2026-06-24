package Nicolas_End.demo.infra.util.response;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T datas;
    private String error;
    private String time; // Mostra quando gerou a resposta
    private String path;
    private HttpStatus status;//Endpoint-utilizado


    public boolean getSuccess(){
        return  this.success;
    }
}
