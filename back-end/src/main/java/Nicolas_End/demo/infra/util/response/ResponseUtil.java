package Nicolas_End.demo.infra.util.response;

import Nicolas_End.demo.infra.util.clock.ApiClockUtil;
import Nicolas_End.demo.infra.util.path.ApiPathUtil;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class ResponseUtil {
    private final ApiPathUtil apiPathUtil;

    public ResponseUtil(ApiPathUtil apiPathUtil){
        this.apiPathUtil = apiPathUtil;
    }


    public <T> ApiResponse<T> sucess(T datas, String message,  HttpStatus httpStatus){
        ApiResponse<T> apiResponse = new ApiResponse<>();

        apiResponse.setSuccess(true);
        apiResponse.setMessage(message);
        apiResponse.setDatas(datas);
        apiResponse.setError(null);
        apiResponse.setTime(ApiClockUtil.getPresentHour());
        apiResponse.setPath(this.apiPathUtil.getContextPath());
        apiResponse.setStatus(httpStatus);

        return apiResponse;
    };

    public <T> ApiResponse<T> error(String error , String message,  HttpStatus statusCode){
        ApiResponse<T> apiResponse = new ApiResponse<>();

        apiResponse.setSuccess(false);
        apiResponse.setMessage(message);
        apiResponse.setDatas(null);
        apiResponse.setError(error);
        apiResponse.setTime(ApiClockUtil.getPresentHour());
        apiResponse.setPath(this.apiPathUtil.getContextPath());
        apiResponse.setStatus(statusCode);

        return apiResponse;
    }


}
