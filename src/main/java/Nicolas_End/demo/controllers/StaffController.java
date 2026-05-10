package Nicolas_End.demo.controllers;


import Nicolas_End.demo.domains.staff.StaffService;
import Nicolas_End.demo.dtos.staff.StaffDatasDTO;
import Nicolas_End.demo.infra.response.ApiResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

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

            if (staffStatus.getSucess()){
                return ResponseEntity.ok(staffStatus);
            }
            return ResponseEntity.status(staffStatus.getStatus()).body(staffStatus);
    }

    @GetMapping()
    public ResponseEntity hello(){
        return  ResponseEntity.ok("OLAAA");
    }


}
