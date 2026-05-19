package Nicolas_End.demo.domains.staff;


import Nicolas_End.demo.enums.staff.StaffRoles;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "TB_STAFF")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaffEntity implements UserDetails {

    private StaffEntity(String email, String name, StaffRoles role) {
        this.email = email;
        this.name = name;
        this.role = role;
    }

    public static StaffEntity createStaff(String email, String name, StaffRoles role){
        return new StaffEntity(email, name, role);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;


    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = false)
    private StaffRoles role;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist(){
        this.createdAt = LocalDateTime.now();
        this.password = new BCryptPasswordEncoder().encode("senha123");
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == StaffRoles.ADMINISTRADOR) return List.of(new SimpleGrantedAuthority("ROLE_ADMINISTRADOR"), new SimpleGrantedAuthority("ROLE_COMRPADOR"), new SimpleGrantedAuthority("ROLE_VENDEDOR"), new SimpleGrantedAuthority("ROLE_MOTORISTA"));
        else if (this.role == StaffRoles.COMPRADOR) return List.of(new SimpleGrantedAuthority("ROLE_COMPRADOR"), new SimpleGrantedAuthority("ROLE_VENDEDOR"));
        else if( this.role == StaffRoles.MOTORISTA) return List.of(new SimpleGrantedAuthority("ROLE_MOTORISTA"));
        else return List.of(new SimpleGrantedAuthority("ROLE_VENDEDOR"));
    }

    @Override
    public String getUsername() {
        return this.email;
    }
}
