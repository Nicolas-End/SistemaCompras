package Nicolas_End.demo.domains.staff;

import Nicolas_End.demo.dtos.staff.StaffDatasDTO;
import Nicolas_End.demo.infra.response.ApiResponse;
import Nicolas_End.demo.infra.response.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class StaffService {
    StaffRespository staffRespository;
    String path;


    public StaffService(StaffRespository staffRespository){
        this.path = "/staff";
        this.staffRespository = staffRespository;

    }

    public <T>ApiResponse<T> registerNewStaff(StaffDatasDTO datas ){

        try {
            StaffEntity staff = this.generateStaffEntity(datas);

            this.staffRespository.save(staff);


            return ResponseUtil.sucess(null, "Usuario Cadastrado com Sucesso", this.path);
        }catch (DataIntegrityViolationException e ){
            return  ResponseUtil.error("User already registered", "Usuario Já cadastrado no sistema", path, HttpStatus.CONFLICT);
        }

    }






    private StaffEntity generateStaffEntity(StaffDatasDTO staffDatas){
        StaffEntity staff = new StaffEntity();

        staff.setEmail(staffDatas.email());
        staff.setName(staffDatas.name());
        staff.setRole(staffDatas.role());

        return  staff;
    }


}
