package Nicolas_End.demo.domains.staff;


import Nicolas_End.demo.dtos.staff.StaffDatasDTO;
import Nicolas_End.demo.dtos.staff.StaffEmailAndPasswordDTO;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;


import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping(path = "/staff")
public class StaffController {




    StaffService staffService;

    public StaffController(StaffService staffService){
        this.staffService = staffService;
    }

    @PostMapping
    public ResponseEntity registerStaff(@RequestBody StaffDatasDTO staff){

            ApiResponse staffStatus = this.staffService.registerNewStaff(staff);

            if (staffStatus.getSuccess()){
                return ResponseEntity.ok(staffStatus);
            }
            return ResponseEntity.status(staffStatus.getStatus()).body(staffStatus);

    }

    @PostMapping("/login")
    public ResponseEntity staffLogin(@RequestBody StaffEmailAndPasswordDTO datas){


        ApiResponse staffLogin = this.staffService.validateStaffLogin(datas);
        return ResponseEntity.status(staffLogin.getStatus()).body(staffLogin);
    }


    @GetMapping()
    public  ResponseEntity getAllStaff(){

        ApiResponse staffList = this.staffService.getAllStaff();

        return  ResponseEntity.status(staffList.getStatus())
                .cacheControl(CacheControl.maxAge(10, TimeUnit.MINUTES))
                .body(staffList);

    }

}
