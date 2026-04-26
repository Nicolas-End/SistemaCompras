package Nicolas_End.demo.enums.user;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.User;


public enum UserRole {
    COMPRADOR("COMPRADOR"),
    ADMINISTRADOR("ADMINISTRADOR"),
    VENDEDOR("VENDEDOR"),
    MOTORISTA("MOTORISTA");

    private final String role;

    private UserRole(String role){
        this.role = role;
    }

    private String getRole(){
        return this.role;
    }
}
