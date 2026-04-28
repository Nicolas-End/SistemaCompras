package Nicolas_End.demo.util.response;

import java.time.LocalDateTime;
import java.util.List;

public class ResponseUtil {

    public static<T> ApiResponse<T> sucess(T datas, String message, String path ){
        ApiResponse<T> apiResponse = new ApiResponse<>();

        apiResponse.setSucess(true);
        apiResponse.setMessage(message);
        apiResponse.setDatas(datas);
        apiResponse.setErrors(null);
        apiResponse.setTime(LocalDateTime.now());
        apiResponse.setPath(path);

        return apiResponse;
    };

    public static<T> ApiResponse<T> error(List<String> errors , String message, String path){
        ApiResponse<T> apiResponse = new ApiResponse<>();

        apiResponse.setSucess(false);
        apiResponse.setMessage(message);
        apiResponse.setDatas(null);
        apiResponse.setErrors(errors);
        apiResponse.setTime(LocalDateTime.now());
        apiResponse.setPath(path);

        return apiResponse;
    }
}
