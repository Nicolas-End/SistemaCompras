package Nicolas_End.demo.infra.security;

import Nicolas_End.demo.domains.staff.StaffEntity;
import org.springframework.security.core.context.SecurityContextHolder;

public class AutheticatedStaff {
    // clase para pegar as informações do usuario durante o contexot do sistema
    public StaffEntity get(){
        return (StaffEntity) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
    }
}
