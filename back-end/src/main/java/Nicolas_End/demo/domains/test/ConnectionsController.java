package Nicolas_End.demo.domains.test;

import Nicolas_End.demo.infra.config.RedisConfigurations;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/connection")
public class ConnectionsController {
    public ConnectionsController(RedisConfigurations redisConfigurations){
        this.redisConfigurations = redisConfigurations;
    }
    private final RedisConfigurations redisConfigurations;

    @GetMapping("/redis")
    public ResponseEntity RedisConnection(){
        ApiResponse respone = this.redisConfigurations.validateRedisConnection();

        return ResponseEntity.status(respone.getStatus()).body(respone);
    }

}
