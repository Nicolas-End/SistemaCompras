package Nicolas_End.demo.domains.staff;


import Nicolas_End.demo.enums.staff.StaffRoles;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "TB_STAFF")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaffEntity {

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
    public void PrePersist(){
        this.createdAt = LocalDateTime.now();
        this.password = new BCryptPasswordEncoder().encode("senha123");
    }
}
