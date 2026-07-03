package Nicolas_End.demo.dtos.staff;

import Nicolas_End.demo.enums.staff.StaffRoles;
import jakarta.validation.constraints.NotBlank;

// dto para cadastra novo colaborador
public record StaffDatasDTO(
        @NotBlank
        String email,
        @NotBlank
        String name,
        StaffRoles role) {
}
