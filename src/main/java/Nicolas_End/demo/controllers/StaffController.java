package Nicolas_End.demo.controllers;


import Nicolas_End.demo.domains.staff.StaffService;
import Nicolas_End.demo.dtos.staff.PostNewStaffDTO;
import Nicolas_End.demo.infra.response.ApiResponse;
import Nicolas_End.demo.infra.response.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping(path = "/staff")
public class StaffController {

    StaffService staffService;

    public StaffController(StaffService staffService){
        this.staffService = staffService;
    }

    @PostMapping
    public ResponseEntity createNewStaff(@RequestBody PostNewStaffDTO staff){

            ApiResponse staffStatus = staffService.registerNewStaff(staff);

            if (staffStatus.getSucess()){
                return  ResponseEntity.ok(staffStatus);
            }
            return  ResponseEntity.status(401).body(staffStatus);
    }

    @GetMapping()
    public ResponseEntity hello(){
        return  ResponseEntity.ok("OLAAA");
    }


}
