package Nicolas_End.demo.infra.security.filter;


import Nicolas_End.demo.domains.staff.StaffRepository;
import Nicolas_End.demo.infra.exception.CustomAuthenticationEntryPoint;
import Nicolas_End.demo.infra.exception.ExpiredTokenException;
import Nicolas_End.demo.infra.security.token.TokenService;
import Nicolas_End.demo.infra.util.response.ResponseUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
@RequiredArgsConstructor
public class SecurityFilter extends OncePerRequestFilter {
    private final TokenService tokenService;
    private final StaffRepository staffRespository;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            var token = this.recoverToken(request);
            if (token != null) {
                var email = this.tokenService.validateToken(token);
                UserDetails user = (UserDetails) staffRespository.findByEmail(email);
                if (user == null) {
                    throw new ExpiredTokenException();
                }
                var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

                // "segura os dados do usuario para poder utilizar durante a requisição
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
        }catch (ExpiredTokenException e){
            // evita de enviar o problema para o console do usuario
            this.customAuthenticationEntryPoint.commence(
                    request,
                    response,
                    new ExpiredTokenException()
            );
        }
    }

    private String recoverToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ","");
    }


}
