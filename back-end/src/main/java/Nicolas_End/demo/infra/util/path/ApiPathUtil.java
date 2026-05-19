package Nicolas_End.demo.infra.util.path;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component

public class ApiPathUtil {
    private HttpServletRequest request;

    public ApiPathUtil(HttpServletRequest request){
        this.request = request;
    }

    public String getContextPath(){
        return String.valueOf(request.getRequestURL());
    }
}
