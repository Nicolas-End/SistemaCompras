package Nicolas_End.demo.infra.security.auth;

import Nicolas_End.demo.domains.staff.StaffRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService implements UserDetailsService {
    private final StaffRepository staff;


    public AuthorizationService(StaffRepository staff){

        this.staff = staff;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // procuar o email usuario pelo repositorio
        return (UserDetails) staff.findByEmail(email);
    }
}
