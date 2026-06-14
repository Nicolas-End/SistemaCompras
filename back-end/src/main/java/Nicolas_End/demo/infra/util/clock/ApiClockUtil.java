package Nicolas_End.demo.infra.util.clock;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class ApiClockUtil {

    public static String getPresentDay(){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yy");
        return LocalDateTime.now().format(formatter);
    }

    public static String getPresentHour() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("hh:mm:ss"));
    }



}
