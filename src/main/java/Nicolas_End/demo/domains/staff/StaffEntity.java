package Nicolas_End.demo.domains.staff;


import Nicolas_End.demo.enums.staff.StaffRoles;
import jakarta.persistence.*;
import lombok.*;

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


@Column(nullable = false, unique = false)
private StaffRoles role;


}
