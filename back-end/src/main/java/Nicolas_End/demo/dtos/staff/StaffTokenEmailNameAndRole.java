package Nicolas_End.demo.dtos.staff;

import Nicolas_End.demo.enums.staff.StaffRoles;

public record StaffTokenEmailNameAndRole (String token, String email, String name, StaffRoles role){
}
