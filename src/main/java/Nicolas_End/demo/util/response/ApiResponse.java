package Nicolas_End.demo.util.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ApiResponse<T> {
    private boolean sucess;
    private String message;
    private T datas;
    private List<String> errors;
    private LocalDateTime time; // Mostra quando gerou a resposta
    private String path; //Endpoint-utilizado
}
