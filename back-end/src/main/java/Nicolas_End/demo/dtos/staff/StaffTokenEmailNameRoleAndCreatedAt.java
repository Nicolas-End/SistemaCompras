package Nicolas_End.demo.dtos.staff;

import Nicolas_End.demo.enums.staff.StaffRoles;

import java.time.LocalDateTime;

public record StaffTokenEmailNameRoleAndCreatedAt (String token, String email, String name, StaffRoles role, LocalDateTime createdAt){
}
