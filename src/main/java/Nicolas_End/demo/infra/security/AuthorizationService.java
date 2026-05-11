package Nicolas_End.demo.infra.security;

import Nicolas_End.demo.domains.staff.StaffRespository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService implements UserDetailsService {
    private final StaffRespository staff;


    public AuthorizationService(StaffRespository staff){

        this.staff = staff;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // procuar o email usuario pelo repositorio
        return (UserDetails) staff.findByEmail(email);
    }
}
