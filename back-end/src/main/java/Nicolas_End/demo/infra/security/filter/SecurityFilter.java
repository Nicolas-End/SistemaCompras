package Nicolas_End.demo.infra.security.filter;


import Nicolas_End.demo.domains.staff.StaffRepository;
import Nicolas_End.demo.infra.security.token.TokenService;
import Nicolas_End.demo.infra.util.response.ApiResponse;
import Nicolas_End.demo.infra.util.response.ResponseUtil;
import com.sun.tools.jconsole.JConsoleContext;
import com.sun.tools.jconsole.JConsolePlugin;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    private final TokenService tokenService;
    private final StaffRepository staffRespository;
    private final ResponseUtil responseUtil;

    public SecurityFilter(TokenService tokenService,
                          StaffRepository staffRespository,
                          ResponseUtil responseUtil){
        this.tokenService = tokenService;
        this.staffRespository = staffRespository;
        this.responseUtil = responseUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);
        if(token != null){
            var email = this.tokenService.validateToken(token);
            UserDetails user = (UserDetails) staffRespository.findByEmail(email);
            if(user == null){
                throw new InvalidTokenException();
            }
            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

            // "segura os dados do usuario para poder utilizar durante a requisição
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request,response);
    }

    private String recoverToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ","");
    }


}
