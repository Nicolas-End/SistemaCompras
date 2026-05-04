package Nicolas_End.demo.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecutiryConfigurations {
    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity){
        return httpSecurity
                // Desabilita CSRF pois estamos usando API stateless com JWT
                .csrf(csrf -> csrf.disable())

                // Define que a sessão será SEM estado (não mantém sessão do usuário)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Configura as permissões de cada endpoint:
                .authorizeHttpRequests(authorize -> authorize

                        .anyRequest().permitAll()
                )

                // Adiciona o filtro de JWT antes do filtro padrão de login
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)

                // Constrói o objeto SecurityFilterChain
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration){
        // Recupera o AuthenticationManager configurado internamente pelo Spring
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        // Fornece um encoder BCrypt para criptografar senhas
        return new BCryptPasswordEncoder();
    }
}
