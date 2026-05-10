package Nicolas_End.demo.infra.response;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

public class ResponseUtil {



    public static<T> ApiResponse<T> sucess(T datas, String message, String path ){
        ApiResponse<T> apiResponse = new ApiResponse<>();

        apiResponse.setSucess(true);
        apiResponse.setMessage(message);
        apiResponse.setDatas(datas);
        apiResponse.setError(null);
        apiResponse.setTime(LocalDateTime.now());
        apiResponse.setPath(path);

        return apiResponse;
    };

    public static<T> ApiResponse<T> error(String error , String message, String path, HttpStatus statusCode){
        ApiResponse<T> apiResponse = new ApiResponse<>();

        apiResponse.setSucess(false);
        apiResponse.setMessage(message);
        apiResponse.setDatas(null);
        apiResponse.setError(error);
        apiResponse.setTime(LocalDateTime.now());
        apiResponse.setPath(path);
        apiResponse.setStatus(statusCode);

        return apiResponse;
    }
}
