package Nicolas_End.demo.infra.util.response;

import Nicolas_End.demo.infra.util.path.ApiPathUtil;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ResponseUtil {
    private final ApiPathUtil apiPathUtil;

    public ResponseUtil(ApiPathUtil apiPathUtil){
        this.apiPathUtil = apiPathUtil;
    }


    public <T> ApiResponse<T> sucess(List<T> datas, String message,  HttpStatus httpStatus){
        ApiResponse<T> apiResponse = new ApiResponse<>();

        apiResponse.setSucess(true);
        apiResponse.setMessage(message);
        apiResponse.setDatas(datas);
        apiResponse.setError(null);
        apiResponse.setTime(LocalDateTime.now());
        apiResponse.setPath(this.apiPathUtil.getContextPath());
        apiResponse.setStatus(httpStatus);

        return apiResponse;
    };

    public <T> ApiResponse<T> error(String error , String message,  HttpStatus statusCode){
        ApiResponse<T> apiResponse = new ApiResponse<>();

        apiResponse.setSucess(false);
        apiResponse.setMessage(message);
        apiResponse.setDatas(null);
        apiResponse.setError(error);
        apiResponse.setTime(LocalDateTime.now());
        apiResponse.setPath(this.apiPathUtil.getContextPath());
        apiResponse.setStatus(statusCode);

        return apiResponse;
    }
}
