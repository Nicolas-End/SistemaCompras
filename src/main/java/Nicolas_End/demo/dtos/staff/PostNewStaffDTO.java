package Nicolas_End.demo.dtos.staff;

import Nicolas_End.demo.enums.staff.StaffRoles;

// dto para cadastra novo colaborador
public record PostNewStaffDTO(String email, String name, StaffRoles role) {
}
