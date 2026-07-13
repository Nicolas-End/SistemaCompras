package Nicolas_End.demo.infra.config;

import Nicolas_End.demo.infra.exception.CustomAuthenticationEntryPoint;
import Nicolas_End.demo.infra.security.filter.SecurityFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;



@Configuration
@EnableWebSecurity
public class SecutiryConfigurations {

    SecurityFilter securityFilter;
    CustomAuthenticationEntryPoint authenticationEntryPoint;

    public SecutiryConfigurations(SecurityFilter securityFilter, CustomAuthenticationEntryPoint authenticationEntryPoint){
        this.securityFilter = securityFilter;
        this.authenticationEntryPoint = authenticationEntryPoint;

    }

    @Value("${api.origin.url}")
    private String originUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity){
        return httpSecurity
                .addFilterBefore(this.securityFilter, UsernamePasswordAuthenticationFilter.class)
                .cors(Customizer.withDefaults())
                .exceptionHandling(exception -> exception.authenticationEntryPoint(this.authenticationEntryPoint))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Configura as permissões de cada endpoint:
                .authorizeHttpRequests(authorize -> authorize

                 .requestMatchers("/staff/login", "/health", "/connection/**").permitAll()
                 .requestMatchers(HttpMethod.POST, "/staff").hasRole("COMPRADOR")
                 .requestMatchers(HttpMethod.GET, "/quote").hasAnyRole("COMPRADOR", "ADMINISTRADOR")
                 .anyRequest().authenticated()
                )



                .build();
    }


    //configuração do Cors do sistema
    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin(this.originUrl);
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.addAllowedOriginPattern("*");
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",corsConfiguration);
        return source;
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
