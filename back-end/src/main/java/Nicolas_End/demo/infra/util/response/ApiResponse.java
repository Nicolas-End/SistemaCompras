package Nicolas_End.demo.infra.util.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import tools.jackson.databind.annotation.JsonDeserialize;
import tools.jackson.databind.annotation.JsonSerialize;
import tools.jackson.databind.ext.javatime.deser.LocalDateTimeDeserializer;
import tools.jackson.databind.ext.javatime.ser.LocalDateTimeSerializer;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ApiResponse<T> {
    private boolean sucess;
    private String message;
    private T datas;
    private String error;
    private String time; // Mostra quando gerou a resposta
    private String path;
    private HttpStatus status;//Endpoint-utilizado


    public boolean getSucess(){
        return  this.sucess;
    }
}
